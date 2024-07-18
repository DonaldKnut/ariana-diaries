// models/ProductCategory.ts
import { Schema, model, models, Document } from "mongoose";

export interface IProductCategory extends Document {
  title: string;
  description: string;
  image: string;
  slug: string;
  color: string;
  // name: string;
}

const productCategorySchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    color: { type: String, required: true },
    // name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const ProductCategoryModel =
  models.ProductCategory ||
  model<IProductCategory>("ProductCategory", productCategorySchema);

export default ProductCategoryModel;
