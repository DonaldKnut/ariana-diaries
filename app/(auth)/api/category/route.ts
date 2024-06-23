// pages/api/blog-posts/[categoryID].ts

import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { connect } from "../../../../database";
import Post, { IPost } from "../../../../models/Post"; // Adjust path as necessary

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ success: boolean; data?: IPost[]; message?: string }>
) {
  await connect(); // Ensure MongoDB connection

  const { categoryID } = req.query;

  if (req.method === "GET") {
    try {
      if (!categoryID) {
        return res
          .status(400)
          .json({ success: false, message: "Category ID is required" });
      }

      // Validate if categoryID is a valid ObjectId
      if (!mongoose.isValidObjectId(categoryID as string)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid category ID format" });
      }

      // Fetch blog posts based on categoryID
      const blogPostList = await Post.find({ category: categoryID });

      return res.status(200).json({ success: true, data: blogPostList });
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong" });
    }
  } else {
    return res
      .status(405)
      .json({ success: false, message: `Method ${req.method} not allowed` });
  }
}
