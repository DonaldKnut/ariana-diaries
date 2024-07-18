// /pages/api/categories/[categoryID]/route.ts

import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connect } from "../../../../../database";
import Post, { IPost } from "../../../../../models/Post";

export async function GET(request: Request) {
  await connect(); // Ensure MongoDB connection

  const { searchParams } = new URL(request.url);
  const categoryID = searchParams.get("categoryID");

  if (!categoryID || typeof categoryID !== "string") {
    return NextResponse.json(
      { success: false, message: "Category ID is required" },
      { status: 400 }
    );
  }

  // Validate if categoryID is a valid ObjectId
  if (!mongoose.isValidObjectId(categoryID)) {
    return NextResponse.json(
      { success: false, message: "Invalid category ID format" },
      { status: 400 }
    );
  }

  try {
    // Fetch blog posts based on categoryID
    const blogPostList = await Post.find({ category: categoryID });

    return NextResponse.json({ success: true, data: blogPostList });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
