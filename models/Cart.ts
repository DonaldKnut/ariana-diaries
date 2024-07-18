// models/Cart.ts
import mongoose, { Document, Schema } from "mongoose";
import { IProduct } from "./Product";

export interface ICartItem extends Document {
  userId: string;
  items: {
    product: IProduct;
    quantity: number;
  }[];
}

const CartItemSchema: Schema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, default: 1 },
});

const CartSchema: Schema = new Schema({
  userId: { type: String, required: true, unique: true },
  items: [CartItemSchema],
});

export default mongoose.models.Cart ||
  mongoose.model<ICartItem>("Cart", CartSchema);
