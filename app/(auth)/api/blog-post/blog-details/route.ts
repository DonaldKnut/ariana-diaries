// pages/api/blog-post/get-blog-details.ts
import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../../../database";
import mongoose from "mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { blogID } = req.query;

    if (typeof blogID !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid blogID" });
    }

    const connection = await connect(); // Get the mongoose connection
    const collection = connection.db.collection("posts");

    const blogDetails = await collection.findOne({
      _id: new mongoose.Types.ObjectId(blogID),
    });

    if (blogDetails) {
      return res.status(200).json({
        success: true,
        data: blogDetails,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Blog details not found",
      });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}
