// /pages/api/books/route.ts
import { NextResponse } from "next/server";
import ProductModel, { IProduct } from "../../../../models/Product";
import { connect } from "../../../../database";

// Connect to MongoDB
connect();

export async function GET() {
  try {
    // Find only the products where 'isFeatured' is true
    const products: IProduct[] = await ProductModel.find({ isFeatured: true });
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching featured books:", error);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
