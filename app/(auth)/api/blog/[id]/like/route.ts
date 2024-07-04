import mongoose from "mongoose";
import { connect } from "../../../../../../database";
import { verifyJwtToken } from "../../../../../../lib/jwt";
import Blog from "../../../../../../models/Post";
import { NextApiRequest, NextApiResponse } from "next";

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connect();
  } catch (error) {
    console.error("Database connection error:", error);
    return res.status(500).json({
      message: "Database connection error",
      error: (error as Error).message,
    });
  }

  const id = req.query.id as string; // Get the id from the URL
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    console.error("Unauthorized access: No token provided");
    return res.status(403).json({ error: "unauthorized (no token)" });
  }

  const token = accessToken.split(" ")[1];
  let decodedToken;

  try {
    decodedToken = verifyJwtToken(token);
  } catch (error) {
    console.error("Token verification error:", error);
    return res
      .status(403)
      .json({ error: "unauthorized (wrong or expired token)" });
  }

  if (!decodedToken) {
    console.error("Token verification failed");
    return res
      .status(403)
      .json({ error: "unauthorized (wrong or expired token)" });
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid blog post ID" });
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      console.error("Blog post not found:", id);
      return res.status(404).json({ message: "Blog post not found" });
    }

    if (blog.likes.includes(decodedToken._id)) {
      blog.likes = blog.likes.filter(
        (userId) => userId.toString() !== decodedToken._id.toString()
      );
    } else {
      blog.likes.push(decodedToken._id);
    }

    await blog.save();

    return res.status(200).json(blog);
  } catch (error) {
    console.error("PUT request error:", error);
    return res
      .status(500)
      .json({ message: "PUT error", error: (error as Error).message });
  }
}
