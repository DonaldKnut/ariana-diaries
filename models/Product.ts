import mongoose, { Document, Schema, model } from "mongoose";

export interface IProduct extends Document {
  title: string;
  image: string;
  description: string;
  price: number;
  isFeatured: boolean;
  options?: Record<string, any>;
  catSlug: mongoose.Schema.Types.ObjectId;
}

const productSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    isFeatured: { type: Boolean, required: true },
    options: { type: Schema.Types.Mixed },
    catSlug: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = model<IProduct>("Product", productSchema);
