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
    const body = await req.json();
    const post = await Post.findById(id).populate("author");

    if (post?.userId.toString() !== decodedToken._id.toString()) {
      return NextResponse.json(
        { msg: "Only author can update his/her blog" },
        { status: 403 }
      );
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { $set: { ...body } },
      { new: true }
    );

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "PUT error", error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "PUT error", error: "Unknown error occurred" },
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
        select: "-password",
        model: User,
      })
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "-password",
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
    const post = await Post.findById(id).populate("author");

    if (post?.userId.toString() !== decodedToken._id.toString()) {
      return NextResponse.json(
        { msg: "Only author can delete his/her blog" },
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
        { message: "Delete error", error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Delete error", error: "Unknown error occurred" },
      { status: 500 }
    );
  }
}
