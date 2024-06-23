import { NextRequest, NextResponse } from "next/server";
import Post, { IPost } from "../../../../../models/Post";

export async function GET(request: NextRequest) {
  try {
    const getAllBlogPosts: IPost[] = await Post.find().exec();

    if (getAllBlogPosts && getAllBlogPosts.length) {
      return NextResponse.json({
        success: true,
        data: getAllBlogPosts,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "No blog posts found",
      });
    }
  } catch (e) {
    console.error("Error fetching blog posts:", e); // Log detailed error message
    return NextResponse.json({
      success: false,
      message: "Failed to fetch blog posts. Please try again",
    });
  }
}
