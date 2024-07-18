// app/api/cart/route.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { connect } from "../../../../../database";
import Cart from "../../../../../models/Cart";
import ProductModel, { IProduct } from "../../../../../models/Product";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  await connect();
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userId = session.user?.id;

  try {
    const cart = await Cart.findOne({ userId }).populate("items.product");
    if (!cart) {
      return res.status(200).json([]);
    }
    return res.status(200).json(cart.items);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching cart" });
  }
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  await connect();
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userId = session.user?.id;

  try {
    const { productId, quantity } = req.body;
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
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
    return res.status(200).json(cart.items);
  } catch (error) {
    return res.status(500).json({ error: "Error adding to cart" });
  }
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  await connect();
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userId = session.user?.id;

  try {
    const { productId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item: { product: IProduct; quantity: number }) =>
        item.product.toString() !== productId
    );

    await cart.save();
    return res.status(200).json(cart.items);
  } catch (error) {
    return res.status(500).json({ error: "Error removing from cart" });
  }
}
