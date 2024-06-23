// src/models/Order.ts
import { Schema, model, Document, Types } from "mongoose";

export interface IOrder extends Document {
  status: string;
  // Add other fields as necessary
}

const orderSchema = new Schema<IOrder>({
  status: { type: String, required: true },
  // Define more fields as necessary
});

const Order = model<IOrder>("Order", orderSchema);
export default Order;
