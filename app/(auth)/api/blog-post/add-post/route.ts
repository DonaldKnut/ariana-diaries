// api/posts/create.ts
import { NextRequest, NextResponse } from "next/server";
import Post, { IPost } from "../../../../../models/Post";
import { connect } from "../../../../../database";

export async function POST(request: NextRequest) {
  try {
    await connect(); // Ensure the database is connected

    const extractPostData = await request.json();
    console.log("Received data:", extractPostData);

    // Validate extractPostData to ensure all required fields are present
    const { title, image, category, content, userid, userimage, description } =
      extractPostData;
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

    // Create a new blog post using Mongoose
    const newlyCreatedPost = new Post({
      title,
      description: description || "",
      image,
      category,
      content,
      userid,
      userimage: userimage || "", // Use empty string if userimage is not provided
    });

    await newlyCreatedPost.save();

    console.log("New blog post added:", newlyCreatedPost);

    return NextResponse.json({
      success: true,
      message: "New blog post added successfully",
      post: newlyCreatedPost, // Include the created post in the response
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
