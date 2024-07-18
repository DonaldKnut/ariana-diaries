import mongoose, { Schema, Document, Types } from "mongoose";
import { IProductCategory } from "./ProductCategory";

export interface IProduct extends Document {
  _id: Types.ObjectId;
  title: string;
  desc: string;
  img: string;
  price: number;
  options: {
    title: string;
    additionalPrice: number;
  }[];
  category: Types.ObjectId | IProductCategory;
  isFeatured?: boolean;
}

const ProductSchema: Schema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  img: { type: String, required: true },
  price: { type: Number, required: true },
  options: [
    {
      title: { type: String, required: true },
      additionalPrice: { type: Number, required: true },
    },
  ],
  category: {
    type: Schema.Types.ObjectId,
    ref: "ProductCategory",
    required: true,
  },
  isFeatured: { type: Boolean, default: false },
});

export default mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);
