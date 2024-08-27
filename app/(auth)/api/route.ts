import { cloudinary } from "../../../utils/cloudinaryConfig";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { connect } from "../../../database";
import { authOptions } from "../../../authOptions/authOptions";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const userEmail = session.user?.email;

  try {
    const { db } = await connect();

    if (!db) {
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    const user = await db.collection("users").findOne({ email: userEmail });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { password, verificationToken, ...userWithoutSensitiveData } = user;

    return NextResponse.json(userWithoutSensitiveData, { status: 200 });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Error fetching user data" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const { file } = await request.json();

  try {
    const uploadResponse = await cloudinary.uploader.upload(file, {
      upload_preset: "blog_images",
    });

    return NextResponse.json(
      { url: uploadResponse.secure_url },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { error: "Error uploading image" },
      { status: 500 }
    );
  }
}
