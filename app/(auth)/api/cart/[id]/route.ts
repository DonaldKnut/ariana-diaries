import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../../authOptions/authOptions";
import { connect } from "../../../../../database";
import Cart from "../../../../../models/Cart";
import ProductModel, { IProduct } from "../../../../../models/Product";

async function getSessionOrReject(req: NextRequest) {
  const session = await getServerSession({ req, ...authOptions });
  console.log("Session object:", session);
  if (!session) {
    return {
      error: new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      }),
    };
  }

  // Log the token to the console
  //   console.log("Session token:", session.user.accessToken);

  return { session };
}

export async function GET(req: NextRequest) {
  await connect();

  const { error, session } = await getSessionOrReject(req);
  if (error) return error;

  const userId = session.user._id;

  try {
    const cart = await Cart.findOne({ userId }).populate("items.product");
    if (!cart) {
      return new NextResponse(JSON.stringify([]), { status: 200 });
    }
    return new NextResponse(JSON.stringify(cart.items), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Error fetching cart" }), {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  await connect();

  const { error, session } = await getSessionOrReject(req);
  if (error) return error;

  const userId = session.user._id;

  try {
    const { productId, quantity } = await req.json();
    const product = await ProductModel.findById(productId);
    if (!product) {
      return new NextResponse(JSON.stringify({ error: "Product not found" }), {
        status: 404,
      });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item: { product: IProduct; quantity: number }) =>
        item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product, quantity });
    }

    await cart.save();
    return new NextResponse(JSON.stringify(cart.items), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Error adding to cart" }), {
      status: 500,
    });
  }
}

export async function DELETE(req: NextRequest) {
  await connect();

  const { error, session } = await getSessionOrReject(req);
  if (error) return error;

  const userId = session.user._id;

  try {
    const { productId } = await req.json();

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return new NextResponse(JSON.stringify({ error: "Cart not found" }), {
        status: 404,
      });
    }

    cart.items = cart.items.filter(
      (item: { product: IProduct; quantity: number }) =>
        item.product.toString() !== productId
    );

    await cart.save();
    return new NextResponse(JSON.stringify(cart.items), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Error removing from cart" }),
      { status: 500 }
    );
  }
}
