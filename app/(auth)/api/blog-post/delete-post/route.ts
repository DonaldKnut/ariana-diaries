// app/(auth)/api/auth/session/route.ts
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Post from "../../../../../models/Post";
import User from "../../../../../models/User";
import { connect } from "../../../../../database";

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const userId = searchParams.get("userid");

    if (
      !id ||
      typeof id !== "string" ||
      !userId ||
      typeof userId !== "string"
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid blog ID or user ID" },
        { status: 400 }
      );
    }

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid blog ID format" },
        { status: 400 }
      );
    }

    await connect();

    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    if (post.userId.toString() !== userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 403 }
      );
    }

    await post.deleteOne();

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
