import { NextResponse } from "next/server";
import { connect } from "../../../../../../database/index";
import OrderModel from "../../../../../../models/Order";
import mongoose from "mongoose";

export const PUT = async (
  request: Request,
  { params }: { params: { intentId: string } }
) => {
  await connect();
  const { intentId } = params;

  if (!intentId || !mongoose.Types.ObjectId.isValid(intentId)) {
    return NextResponse.json({ message: "Invalid intent ID" }, { status: 400 });
  }

  try {
    const order = await OrderModel.findOneAndUpdate(
      { intent_id: intentId },
      { status: "Being prepared!" },
      { new: true }
    );

    if (order) {
      return NextResponse.json(
        { message: "Order has been updated" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Order not found!" },
        { status: 404 }
      );
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
};
