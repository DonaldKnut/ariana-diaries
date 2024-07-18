// app/api/posts/search/route.js

import { connect } from "../../../../database/index";
import Post from "../../../../models/Post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connect();

    const url = new URL(req.url);
    const extractQuery = url.searchParams.get("query") || "";

    const searchPostList = await Post.find({
      $or: [
        { title: { $regex: extractQuery, $options: "i" } },
        { description: { $regex: extractQuery, $options: "i" } },
      ],
    });

    if (searchPostList.length > 0) {
      return NextResponse.json({
        success: true,
        data: searchPostList,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "No results found",
      });
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
}
