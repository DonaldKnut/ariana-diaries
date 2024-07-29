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

    // Create a Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: body.price * 100, // Stripe expects the amount in cents
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    body.intent_id = paymentIntent.id;

    const newOrder = await Order.create(body);
    return NextResponse.json(
      { order: newOrder, clientSecret: paymentIntent.client_secret },
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
