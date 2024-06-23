// pages/api/orders/[id].ts

import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { connect } from "../../../../../database"; // Adjust path as necessary
import Order, { IOrder } from "../../../../../models/Order"; // Adjust path as necessary

// Ensure MongoDB connection
await connect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      const body = await req.json();

      // Validate the request body to ensure it contains the status field
      if (!body || !body.status) {
        return res.status(400).json({ message: "Status is required" });
      }

      // Validate if ID is a valid ObjectId
      if (!mongoose.isValidObjectId(id as string)) {
        return res.status(400).json({ message: "Invalid order ID format" });
      }

      const updatedOrder = await Order.findByIdAndUpdate(
        id,
        { status: body.status },
        { new: true }
      );

      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }

      return res.status(200).json({ message: "Order has been updated!" });
    } catch (err) {
      console.log("Error updating order:", err);
      return res.status(500).json({ message: "Something went wrong!" });
    }
  } else {
    return res
      .status(405)
      .json({ message: `Method ${req.method} not allowed` });
  }
}
