import { NextRequest, NextResponse } from "next/server";
import Post, { IPost } from "../../../../models/Post";
import User from "../../../../models/User";
import { connect } from "../../../../database";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const extractPostData = await request.json();
    console.log("Received data:", extractPostData);

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

    const user = await User.findOne({ name: userid }).exec();

    if (!user) {
      console.error("User not found:", userid);
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 400 }
      );
    }

    const userImage = user.avatar?.url || "";

    const newlyCreatedPost = new Post({
      title,
      description,
      image,
      category,
      userId: user._id,
      userImage: userimage || userImage || "",
      content,
      excerpt,
      quote,
      author: user._id,
    });

    await newlyCreatedPost.save();

    console.log("New blog post added:", newlyCreatedPost);

    return NextResponse.json({
      success: true,
      message: "New blog post added successfully",
      post: newlyCreatedPost,
    });
  } catch (error: any) {
    console.error("Error creating blog post:", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
      error: error.message,
    });
  }
}

export async function GET(request: NextRequest) {
  try {
    await connect();
    const getAllBlogPosts = await Post.find()
      .populate({
        path: "author",
        select: "name avatar designation",
        strictPopulate: false, // Set this to false if strict mode is causing issues
      })
      .sort({ createdAt: -1 })
      .exec();

    const formattedPosts = getAllBlogPosts.map((post) => ({
      ...post.toObject(),
      image: { url: post.image }, // Ensure image is an object with a url property
    }));

    if (getAllBlogPosts.length > 0) {
      return NextResponse.json({
        success: true,
        data: formattedPosts,
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
