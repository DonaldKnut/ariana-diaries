// app/(auth)/api/blog-post/blog-details/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../../database";
import mongoose from "mongoose";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const blogID = searchParams.get("blogID");

    if (!blogID || typeof blogID !== "string") {
      return NextResponse.json(
        { success: false, message: "Invalid blogID" },
        { status: 400 }
      );
    }

    await connect();
    const collection = mongoose.connection.db.collection("posts");

    const blogDetails = await collection.findOne({
      _id: new mongoose.Types.ObjectId(blogID),
    });

    if (blogDetails) {
      return NextResponse.json(
        {
          success: true,
          data: blogDetails,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Blog details not found",
        },
        { status: 404 }
      );
    }
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
