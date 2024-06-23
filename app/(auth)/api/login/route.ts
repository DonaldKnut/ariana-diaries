import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import UserModel from "../../../../models/User"; // Adjust the import path based on your project structure
import { connect } from "../../../../database/index";
import { signJwtToken } from "../../../../lib/jwt";

export async function POST(req: NextRequest) {
  try {
    await connect();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    }

    const currentUser = user.toObject();
    const accessToken = signJwtToken(currentUser, { expiresIn: "7d" });

    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          ...currentUser,
          accessToken,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "An error occurred during login" },
      { status: 500 }
    );
  }
}
