import { NextResponse } from "next/server";
import { connect } from "../../../../../database";
import Post from "../../../../../models/Post";

export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  await connect();

  const { category } = params;

  if (!category || typeof category !== "string") {
    return NextResponse.json(
      { success: false, message: "Category is required" },
      { status: 400 }
    );
  }

  try {
    // Fetch blog posts based on category name
    const blogPostList = await Post.find({ category });

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
