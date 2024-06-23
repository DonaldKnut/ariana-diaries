// pages/api/categories.ts

import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../../database";
import Category, { CategoryDocument } from "../../../../models/Category";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CategoryDocument[] | { message: string }>
) {
  await connect(); // Ensure MongoDB connection

  if (req.method === "GET") {
    try {
      const categories = await Category.find();

      return res.status(200).json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  } else {
    return res
      .status(405)
      .json({ message: `Method ${req.method} not allowed` });
  }
}
