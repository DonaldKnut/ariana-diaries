import prisma from "../../../../../database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const extractPostData = await request.json();

    // Validate extractPostData to ensure all required fields are present
    const { title, description, image, category, content, userId } =
      extractPostData;
    if (!title || !description || !image || !category || !content || !userId) {
      return NextResponse.json({
        success: false,
        message: "Required fields are missing in the request",
      });
    }

    // Adjusted create method with correct fields
    const newlyCreatedPost = await prisma.post.create({
      data: {
        title,
        description,
        image,
        category,
        content,
        userId,
        userImage: extractPostData.userImage || "", // Adjust this according to your actual data structure
      },
    });

    console.log("New blog post added:", newlyCreatedPost);

    return NextResponse.json({
      success: true,
      message: "New blog post added successfully",
    });
  } catch (error) {
    console.error("Error creating blog post:", error);

    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
}
