import { NextResponse } from "next/server";
import { connect } from "../../../../../../database/index";
import OrderModel from "../../../../../../models/Order";
import mongoose from "mongoose";

interface Params {
  params: {
    intentId: string;
  };
}

export const PUT = async ({ params }: Params) => {
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
      return new NextResponse(
        JSON.stringify({ message: "Order has been updated" }),
        { status: 200 }
      );
    } else {
      return new NextResponse(JSON.stringify({ message: "Order not found!" }), {
        status: 404,
      });
    }
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
