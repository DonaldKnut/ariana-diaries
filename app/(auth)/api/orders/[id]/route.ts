import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connect } from "../../../../../database";
import Order from "../../../../../models/Order";

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
  try {
    const body = await request.json();
    const newOrder = await Order.create(body);
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { message: "Error creating order" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  await connect();
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();

  try {
    const body = await request.json();

    // Validate the request body to ensure it contains the status field
    if (!body || !body.status) {
      return NextResponse.json(
        { message: "Status is required" },
        { status: 400 }
      );
    }

    // Validate if ID is a valid ObjectId
    if (!mongoose.isValidObjectId(id as string)) {
      return NextResponse.json(
        { message: "Invalid order ID format" },
        { status: 400 }
      );
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status: body.status },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Order has been updated!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
