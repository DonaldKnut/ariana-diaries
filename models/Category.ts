// models/category.ts

import mongoose, { Schema, Document } from "mongoose";

export interface CategoryDocument extends Document {
  name: string;
  // Add more fields as necessary
}

const categorySchema: Schema<CategoryDocument> = new Schema({
  name: { type: String, required: true },
  // Define more fields as necessary
});

const Category = mongoose.model<CategoryDocument>("Category", categorySchema);

export default Category;
