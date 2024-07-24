import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connect } from "../../../../database";
import ProductCategory from "../../../../models/ProductCategory"; // Ensure you have a Category model

export async function GET(request: Request) {
  try {
    await connect(); // Ensure MongoDB connection

    // Fetch all categories
    const categoryList = await ProductCategory.find();

    return NextResponse.json({ success: true, data: categoryList });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
