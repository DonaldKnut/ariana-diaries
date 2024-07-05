import { connect } from "../../../../database";
import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "../../../../lib/jwt";
import Post, { IPost } from "../../../../models/Post";
import User from "../../../../models/User";
import { deleteManyPhotos } from "../../../../actions/uploadActions";

export async function PATCH(
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

  const decodedToken = verifyJwtToken(token);

  if (!decodedToken) {
    return NextResponse.json(
      { error: "unauthorized (wrong or expired token)" },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const post = (await Post.findById(id)) as IPost | null;

    if (!post || post.authorId.toString() !== decodedToken._id.toString()) {
      return NextResponse.json(
        { msg: "Only author can update his/her data" },
        { status: 403 }
      );
    }

    const updatePost = await Post.findByIdAndUpdate(post._id, body, {
      new: true,
    });

    return NextResponse.json(updatePost, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "PATCH error" }, { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connect();

  const id = params.id;

  try {
    const post = (await Post.findById(id).select("-__v")) as IPost | null;

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
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

  const decodedToken = verifyJwtToken(token);

  if (!decodedToken) {
    return NextResponse.json(
      { error: "unauthorized (wrong or expired token)" },
      { status: 403 }
    );
  }

  try {
    const post = (await Post.findById(id).select("-__v")) as IPost | null;

    if (!post || post.authorId.toString() !== decodedToken._id.toString()) {
      return NextResponse.json(
        { msg: "Only author can delete his/her data" },
        { status: 403 }
      );
    }

    const finalImageIds = [
      {
        id: post.image, // Assuming post.image is the ID of the image
      },
    ];

    await Promise.all([
      Post.findOneAndDelete({ _id: post._id }),
      deleteManyPhotos(finalImageIds),
    ]);

    return NextResponse.json({ msg: "Post deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Delete error" }, { status: 500 });
  }
}
