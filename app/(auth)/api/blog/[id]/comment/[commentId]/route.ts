import { connect } from "../../../../../../../database";
import { verifyJwtToken } from "../../../../../../../lib/jwt";
import { JwtPayload } from "jsonwebtoken";
import Post from "../../../../../../../models/Post";
import Comment from "../../../../../../../models/Comment";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";

interface DecodedToken extends JwtPayload {
  _id: string;
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string; commentId: string } }
) {
  await connect();

  const { id, commentId } = params;
  const accessToken = req.headers.get("authorization");

  if (!accessToken) {
    return NextResponse.json(
      { error: "unauthorized (missing token)" },
      { status: 403 }
    );
  }

  const token = accessToken.split(" ")[1];
  const decodedToken = verifyJwtToken(token) as DecodedToken;

  if (!decodedToken) {
    return NextResponse.json(
      { error: "unauthorized (wrong or expired token)" },
      { status: 403 }
    );
  }

  try {
    const post = await Post.findById(id)
      .populate("author")
      .populate("comments");

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return NextResponse.json(
        { message: "Comment does not exist" },
        { status: 404 }
      );
    }

    if (comment.user.toString() !== decodedToken._id) {
      return NextResponse.json(
        { message: "Only the author can delete their comment" },
        { status: 403 }
      );
    }

    post.comments = post.comments.filter(
      (c) => (c as unknown as Types.ObjectId).toString() !== commentId
    );

    await comment.deleteOne();
    await post.save();

    return NextResponse.json(
      { message: "Successfully deleted comment" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Delete error" }, { status: 500 });
  }
}
