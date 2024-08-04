import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connect } from "../../../../database";
import Order from "../../../../models/Order";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../authOptions/authOptions";
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function GET(request: NextRequest) {
  await connect();
  try {
    const orders = await Order.find();
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { message: "Error fetching orders" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  await connect();

  const session = await getServerSession({ req: request, ...authOptions });

  if (!session || session.user.role !== "admin") {
    return NextResponse.json(
      { message: "Unauthorized: Admin access required" },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();

    console.log("Request Body:", body);

    if (!body.price || !body.products || !body.userEmail) {
      console.log("Missing required fields");
      return NextResponse.json(
        { message: "price, products, and userEmail are required" },
        { status: 400 }
      );
    }

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: body.products.map((product) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.title,
          },
          unit_amount: product.price * 100, // Amount in cents
        },
        quantity: product.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.NEXTAUTH_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cancel`,
      customer_email: body.userEmail,
    });

    body.sessionId = session.id;

    const newOrder = await Order.create(body);
    return NextResponse.json(
      { order: newOrder, sessionId: session.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { message: "Error creating order" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { status } = await request.json();

  if (!status) {
    return NextResponse.json(
      { message: "Status is required" },
      { status: 400 }
    );
  }

  try {
    await connect();
    const result = await Order.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: { status } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Order updated successfully" });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
