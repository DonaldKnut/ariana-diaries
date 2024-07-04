import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../../../database";
import { verifyJwtToken } from "../../../../../../lib/jwt";
import Post from "../../../../../../models/Post";
import Comment, { IComment } from "../../../../../../models/Comment";
import mongoose from "mongoose";

export async function POST(request: NextRequest) {
  await connect();

  const url = new URL(request.url);
  const pathSegments = url.pathname.split("/");
  const postId = pathSegments[3]; // Assuming the 4th segment is the post ID

  console.log("URL Path Segments:", pathSegments); // Debug statement
  console.log("Post ID:", postId); // Debug statement

  const authorizationHeader = request.headers.get("authorization");
  let accessToken: string | undefined;

  if (authorizationHeader) {
    accessToken = authorizationHeader.split(" ")[1];
  }

  if (!accessToken) {
    return NextResponse.json(
      { error: "unauthorized (missing token)" },
      { status: 403 }
    );
  }

  if (!postId || !mongoose.isValidObjectId(postId)) {
    return NextResponse.json(
      { error: "Invalid request parameters" },
      { status: 400 }
    );
  }

  try {
    const decodedToken = verifyJwtToken(accessToken);

    if (!decodedToken) {
      return NextResponse.json(
        { error: "unauthorized (wrong or expired token)" },
        { status: 403 }
      );
    }

    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    const { text } = await request.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const newComment = new Comment({
      post: post._id,
      user: mongoose.Types.ObjectId.createFromTime(decodedToken._id),
      text,
      date: new Date(),
    });

    const savedComment = (await newComment.save()) as IComment & {
      _id: mongoose.Schema.Types.ObjectId;
    };

    post.comments.push(savedComment._id);
    await post.save();

    return NextResponse.json(
      {
        _id: savedComment._id.toString(),
        post: savedComment.post,
        user: savedComment.user,
        text: savedComment.text,
        date: savedComment.date,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Comment creation error:", error);
    return NextResponse.json(
      { message: "Error creating comment" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  await connect();

  const url = new URL(request.url);
  const id = url.pathname.split("/")[4];
  const commentId = url.pathname.split("/").pop();
  const accessToken = request.headers.get("authorization")?.split(" ")[1];

  if (!accessToken) {
    return NextResponse.json(
      { error: "unauthorized (missing token)" },
      { status: 403 }
    );
  }

  if (!id || !commentId) {
    return NextResponse.json(
      { error: "Invalid request parameters" },
      { status: 400 }
    );
  }

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return NextResponse.json({ error: "Invalid comment ID" }, { status: 400 });
  }

  try {
    const decodedToken = verifyJwtToken(accessToken);

    if (!decodedToken) {
      return NextResponse.json(
        { error: "unauthorized (wrong or expired token)" },
        { status: 403 }
      );
    }

    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    const commentObjectId = new mongoose.Types.ObjectId(commentId);

    const comment = await Comment.findById(commentObjectId);

    if (!comment) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      );
    }

    if (comment.user.toString() !== decodedToken._id) {
      return NextResponse.json(
        { message: "Only the comment author can delete the comment" },
        { status: 403 }
      );
    }

    await Comment.findByIdAndDelete(commentObjectId);

    post.comments = post.comments.filter(
      (id) => id.toString() !== commentObjectId.toString()
    );

    await post.save();

    return NextResponse.json(
      { message: "Comment deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { message: "Error deleting comment" },
      { status: 500 }
    );
  }
}
