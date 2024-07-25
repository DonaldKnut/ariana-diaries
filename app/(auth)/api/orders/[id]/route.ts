import { NextResponse } from "next/server";
import { connect } from "../../../../../database";
import Order from "../../../../../models/Order";

export async function PUT(
  request: Request,
  { params }: { params: { email: string } }
) {
  const { email } = params;
  const { status } = await request.json();

  if (!status) {
    return NextResponse.json(
      { message: "Status is required" },
      { status: 400 }
    );
  }

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  try {
    await connect(); // Establish the database connection
    const result = await Order.updateOne(
      { userEmail: email },
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
