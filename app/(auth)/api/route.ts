import { cloudinary } from "../../../utils/cloudinaryConfig";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { file } = await request.json(); // Use request.json() to parse the incoming JSON

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
