// pages/api/blog/[id].ts

import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Post from "../../../../../backend/models/postSchema";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      if (!id) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid or missing blog ID" });
      }

      // Validate if ID is a valid ObjectId
      if (!mongoose.isValidObjectId(id as string)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid blog ID format" });
      }

      const deletedBlogPost = await Post.findByIdAndDelete(id);

      if (deletedBlogPost) {
        return res.json({
          success: true,
          message: "Blog deleted successfully",
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Blog not found" });
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    return res
      .status(405)
      .json({ success: false, message: `Method ${req.method} not allowed` });
  }
}
