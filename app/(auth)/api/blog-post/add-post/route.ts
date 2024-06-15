import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../database";

export async function POST(request: NextRequest) {
  try {
    const extractPostData = await request.json();
    console.log("Received data:", extractPostData);

    // Validate extractPostData to ensure all required fields are present
    const { title, description, image, category, content, userid } =
      extractPostData;
    if (!title || !description || !image || !category || !content || !userid) {
      return NextResponse.json({
        success: false,
        message: "Required fields are missing in the request",
      });
    }

    // Create a new blog post using Prisma
    const newlyCreatedPost = await prisma.post
      .create({
        data: {
          title,
          description,
          image,
          category,
          content,
          userId: userid,
          userImage: extractPostData.userimage || "",
        },
      })
      .catch((error) => {
        console.error("Prisma create error:", error);
        throw error;
      });

    console.log("New blog post added:", newlyCreatedPost);

    return NextResponse.json({
      success: true,
      message: "New blog post added successfully",
    });
  } catch (error: any) {
    console.error("Error creating blog post:", error); // Log detailed error message

    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
      error: error.message, // Include the error message in the response
    });
  }
}
