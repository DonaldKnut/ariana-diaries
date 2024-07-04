import { NextRequest, NextResponse } from "next/server";
import Post, { IPost } from "../../../../../models/Post";
import { connect } from "../../../../../database";

export async function POST(request: NextRequest) {
  try {
    // Ensure the database is connected
    await connect();

    // Extract data from the request
    const extractPostData = await request.json();
    console.log("Received data:", extractPostData);

    // Destructure and validate the extracted data
    const {
      title,
      image,
      category,
      userid,
      userimage,
      description,
      content,
      excerpt,
      quote,
    } = extractPostData;

    if (
      !title ||
      !image ||
      !category ||
      !userid ||
      !description ||
      !content ||
      !excerpt ||
      !quote
    ) {
      console.error("Required fields are missing:", {
        title,
        image,
        category,
        userid,
        description,
        content,
        excerpt,
        quote,
      });
      return NextResponse.json({
        success: false,
        message: "Required fields are missing in the request",
      });
    }

    // Create a new blog post
    const newlyCreatedPost = new Post({
      title,
      description, // Ensure description is passed correctly
      image,
      category,
      userid,
      userimage: userimage || "", // Use empty string if userimage is not provided
      content,
      excerpt,
      quote,
    });

    // Save the new post to the database
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
