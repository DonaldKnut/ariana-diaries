import { Document } from "mongoose";
import { Schema, model } from "mongoose";

export interface IProductCategory extends Document {
  title: string;
  description: string;
  image: string;
  slug: string;
  color: string;
}

const productCategorySchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    color: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ProductCategoryModel = model<IProductCategory>(
  "ProductCategory",
  productCategorySchema
);

export default ProductCategoryModel;
