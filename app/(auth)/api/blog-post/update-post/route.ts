// api/posts/update.ts
import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../../database";
import Post from "../../../../../models/Post";

export async function PUT(request: NextRequest) {
  try {
    await connect(); // Ensure the database is connected

    const extractData = await request.json();
    const { id, comments } = extractData;

    if (!id || !comments) {
      return NextResponse.json({
        success: false,
        message: "Required fields are missing in the request",
      });
    }

    // Update the blog post using Mongoose
    const updatedBlogPost = await Post.findByIdAndUpdate(
      id,
      { comments },
      { new: true }
    );

    if (updatedBlogPost) {
      return NextResponse.json({
        success: true,
        message: "Blog post updated",
        post: updatedBlogPost,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to update the post! Please try again",
      });
    }
  } catch (e) {
    console.error(e);

    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
}
