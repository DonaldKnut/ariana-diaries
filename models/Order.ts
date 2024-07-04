import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document {
  userEmail: string;
  price: number;
  products: Array<{ title: string; quantity: number }>;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema(
  {
    userEmail: { type: String, required: true },
    price: { type: Number, required: true },
    products: [
      {
        title: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    status: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model<IOrder>("Order", OrderSchema);
