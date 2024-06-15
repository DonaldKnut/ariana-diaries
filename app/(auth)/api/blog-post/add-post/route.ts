import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../database"; // Adjust the import path as necessary

export async function POST(request: NextRequest) {
  try {
    const extractPostData = await request.json();
    console.log("Received data:", extractPostData);

    // Validate extractPostData to ensure all required fields are present
    const { title, image, category, content, userid } = extractPostData;
    if (!title || !image || !category || !content || !userid) {
      console.error("Required fields are missing:", {
        title,
        image,
        category,
        content,
        userid,
      });
      return NextResponse.json({
        success: false,
        message: "Required fields are missing in the request",
      });
    }

    // Create a new blog post using Prisma
    const newlyCreatedPost = await prisma.post.create({
      data: {
        title,
        description: extractPostData.description || "", // Use empty string if description is not provided
        image,
        category,
        content,
        userId: userid,
        userImage: extractPostData.userimage || "",
        comments: extractPostData.comments || [],
      },
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
