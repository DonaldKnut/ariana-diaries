import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../../database/index";
import OrderModel from "../../../../../models/Order";
import mongoose from "mongoose";
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

interface Params {
  params: {
    orderId: string;
  };
}

export async function POST(req: NextRequest, { params }: Params) {
  await connect();
  const { orderId } = params;

  if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
    return NextResponse.json({ message: "Invalid order ID" }, { status: 400 });
  }

  try {
    const order = await OrderModel.findById(orderId);
    if (order) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: order.price * 100,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });

      order.intent_id = paymentIntent.id;
      await order.save();

      return new NextResponse(
        JSON.stringify({ clientSecret: paymentIntent.client_secret }),
        { status: 200 }
      );
    } else {
      return new NextResponse(JSON.stringify({ message: "Order not found!" }), {
        status: 404,
      });
    }
  } catch (error) {
    console.error("Error processing payment:", error);
    return NextResponse.json(
      { message: "Error processing payment" },
      { status: 500 }
    );
  }
}
