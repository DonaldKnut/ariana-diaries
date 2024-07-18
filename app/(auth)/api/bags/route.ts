// app/(auth)/api/bags/route.ts
import { NextResponse } from "next/server";
import { connect } from "../../../../database";
import Product, { IProduct } from "../../../../models/Product";
import ProductCategory, {
  IProductCategory,
} from "../../../../models/ProductCategory";

export async function GET() {
  await connect();

  try {
    // Step 1: Find the ObjectId of the category "Lifestyle Products"
    const category: IProductCategory | null = await ProductCategory.findOne({
      title: "Lifestyle Products",
    }).lean();
    console.log("Category:", category); // Debugging log

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Step 2: Use the ObjectId in the query to find products in the category
    const bags: IProduct[] = await Product.find({
      category: category._id,
    }).lean();
    console.log("Bags:", bags); // Debugging log

    return NextResponse.json(bags);
  } catch (error) {
    console.error("Error fetching bags:", error);
    return NextResponse.json({ error: "Error fetching bags" }, { status: 500 });
  }
}
