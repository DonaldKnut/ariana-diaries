import { NextRequest, NextResponse } from "next/server";
import Post, { IPost } from "../../../../models/Post";
import User from "../../../../models/User";
import { connect } from "../../../../database";

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

    // Find the user in the database
    const user = await User.findOne({ name: userid }).exec();

    if (!user) {
      console.error("User not found:", userid);
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 400 }
      );
    }

    // Use the user's avatar image if userimage is not provided
    const userImage = user.avatar?.image || "";

    // Create a new blog post
    const newlyCreatedPost = new Post({
      title,
      description,
      image,
      category,
      userId: user._id,
      userimage: userimage || userImage || "",
      content,
      excerpt,
      quote,
      author: [user._id],
    });

    // Save the new post to the database
    await newlyCreatedPost.save();

    console.log("New blog post added:", newlyCreatedPost);

    return NextResponse.json({
      success: true,
      message: "New blog post added successfully",
      post: newlyCreatedPost,
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

export async function GET(request: NextRequest) {
  try {
    await connect();
    const getAllBlogPosts: IPost[] = await Post.find()
      .populate({
        path: "author",
        select: "name avatar designation",
      })
      .sort({ createdAt: -1 })
      .exec();

    if (getAllBlogPosts.length > 0) {
      return NextResponse.json({
        success: true,
        data: getAllBlogPosts,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "No blog posts found",
      });
    }
  } catch (error: any) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch blog posts. Please try again",
      error: error.message,
    });
  }
}
