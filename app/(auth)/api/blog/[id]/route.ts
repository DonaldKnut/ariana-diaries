import mongoose, { Schema, Document, Model } from "mongoose";
import { connect } from "../../../../../database";
import { NextResponse, NextRequest } from "next/server";
import { verifyJwtToken } from "../../../../../lib/jwt";
import Post from "../../../../../models/Post";
import { JwtPayload } from "jsonwebtoken";

import User from "../../../../../models/User";
import Comment, { IComment } from "../../../../../models/Comment";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      {
        message: "Database connection error",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }

  const { id } = params;

  if (!id) {
    console.error("ID is undefined");
    return NextResponse.json(
      { error: "ID is missing in the query parameters" },
      { status: 400 }
    );
  }

  const accessToken = req.headers.get("authorization");
  console.log("Access token:", accessToken);

  if (!accessToken) {
    console.error("Unauthorized access: No token provided");
    return NextResponse.json(
      { error: "unauthorized (no token)" },
      { status: 403 }
    );
  }

  const token = accessToken.split(" ")[1];
  let decodedToken;

  try {
    decodedToken = verifyJwtToken(token);
    console.log("Decoded token:", decodedToken);
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json(
      { error: "unauthorized (wrong or expired token)" },
      { status: 403 }
    );
  }

  if (!decodedToken) {
    console.error("Token verification failed");
    return NextResponse.json(
      { error: "unauthorized (wrong or expired token)" },
      { status: 403 }
    );
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(id as string)) {
      return NextResponse.json(
        { message: "Invalid blog post ID" },
        { status: 400 }
      );
    }

    const blog = await Post.findById(id);
    console.log("Blog post found:", blog);

    if (!blog) {
      console.error("Blog post not found:", id);
      return NextResponse.json(
        { message: "Blog post not found" },
        { status: 404 }
      );
    }

    if (blog.likes.includes(decodedToken._id)) {
      return NextResponse.json(
        { message: "User has already liked this post" },
        { status: 400 }
      );
    }

    blog.likes.push(decodedToken._id);
    console.log("Added like to blog post");

    await blog.save();
    console.log("Blog post saved successfully");

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error("PUT request error:", error);
    return NextResponse.json(
      { message: "PUT error", error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connect();

  const id = params.id;

  try {
    const post = await Post.findById(id)
      .populate({
        path: "userId",
        select: "name designation avatar", // Select only necessary fields
        model: User,
      })
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "name designation avatar", // Select only necessary fields
          model: User,
        },
        model: Comment,
      });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "GET error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connect();

  const id = params.id;
  const accessToken = req.headers.get("authorization");

  if (!accessToken) {
    return NextResponse.json(
      { error: "unauthorized (missing token)" },
      { status: 403 }
    );
  }

  const token = accessToken.split(" ")[1];
  const decodedToken = verifyJwtToken(token) as JwtPayload;

  if (!decodedToken) {
    return NextResponse.json(
      { error: "unauthorized (wrong or expired token)" },
      { status: 403 }
    );
  }

  try {
    const post = await Post.findById(id).populate("userId");

    if (post?.userId.toString() !== decodedToken._id.toString()) {
      return NextResponse.json(
        { msg: "Only the author can delete their blog" },
        { status: 403 }
      );
    }

    await Post.findByIdAndDelete(id);

    return NextResponse.json(
      { msg: "Successfully deleted blog" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "DELETE error", error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "DELETE error", error: "Unknown error occurred" },
      { status: 500 }
    );
  }
}
