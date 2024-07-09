import { connect } from "../../../../../database";
import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "../../../../../lib/jwt";
import UserModel, { UserDocument } from "../../../../../models/User";
import { deletePhoto } from "../../../../../actions/uploadActions";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connect();

  const id = params.id;
  const accessToken = req.headers.get("authorization");
  if (!accessToken) {
    console.log("Missing token");
    return NextResponse.json(
      { error: "unauthorized (missing token)" },
      { status: 403 }
    );
  }
  const token = accessToken.split(" ")[1];

  const decodedToken = verifyJwtToken(token);

  if (!decodedToken) {
    console.log("Invalid or expired token");
    return NextResponse.json(
      { error: "unauthorized (wrong or expired token)" },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const user = (await UserModel.findById(id)) as UserDocument | null;

    if (!user) {
      console.log("User not found");
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }

    if (user._id.toString() !== decodedToken._id.toString()) {
      console.log("User not authorized to update this profile");
      return NextResponse.json(
        { msg: "Only the user can update their profile" },
        { status: 403 }
      );
    }

    if (
      body.avatar?.id &&
      user.avatar?.id &&
      body.avatar.id !== user.avatar.id
    ) {
      await deletePhoto(user.avatar.id);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(user._id, body, {
      new: true,
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error in PATCH handler:", error);
    return NextResponse.json({ message: "PATCH error" }, { status: 500 });
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
    console.log("Missing token");
    return NextResponse.json(
      { error: "unauthorized (missing token)" },
      { status: 403 }
    );
  }
  const token = accessToken.split(" ")[1];

  const decodedToken = verifyJwtToken(token);

  if (!decodedToken) {
    console.log("Invalid or expired token");
    return NextResponse.json(
      { error: "unauthorized (wrong or expired token)" },
      { status: 403 }
    );
  }

  try {
    const user = (await UserModel.findById(id).select(
      "-__v"
    )) as UserDocument | null;

    if (!user || user._id.toString() !== decodedToken._id.toString()) {
      console.log("User not authorized to delete this profile");
      return NextResponse.json(
        { msg: "Only the user can delete their profile" },
        { status: 403 }
      );
    }

    if (user.avatar?.id) {
      await deletePhoto(user.avatar.id);
    }

    await UserModel.findByIdAndDelete(user._id);

    return NextResponse.json({ msg: "User deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error in DELETE handler:", error);
    return NextResponse.json({ message: "Delete error" }, { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connect();

  const id = params.id;

  try {
    const user = (await UserModel.findById(id).select(
      "-__v"
    )) as UserDocument | null;

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json({ message: "GET error" }, { status: 500 });
  }
}
