import mongoose from "mongoose";
import { connect } from "../../../../../../database";
import { verifyJwtToken } from "../../../../../../lib/jwt";
import Blog from "../../../../../../models/Post";
import { NextRequest, NextResponse } from "next/server";

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

    const blog = await Blog.findById(id);
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
