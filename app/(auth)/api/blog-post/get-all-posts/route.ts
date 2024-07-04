import { NextRequest, NextResponse } from "next/server";
import Post, { IPost } from "../../../../../models/Post";
import { connect } from "../../../../../database";

export async function GET(request: NextRequest) {
  try {
    await connect();
    const getAllBlogPosts: IPost[] = await Post.find().exec();

    if (getAllBlogPosts.length > 0) {
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
    console.error("Error fetching blog posts:", e);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch blog posts. Please try again",
    });
  }
}
