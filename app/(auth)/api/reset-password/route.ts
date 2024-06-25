import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getUserByEmail, updateUserPassword } from "../../../../utils/user"; // You'll need to implement these functions

export async function POST(request: NextRequest) {
  const { token, password } = await request.json();

  // Validate token
  if (!token) {
    return NextResponse.json({ error: "Token is required" }, { status: 400 });
  }

  // Validate password
  if (!password) {
    return NextResponse.json(
      { error: "Password is required" },
      { status: 400 }
    );
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    return NextResponse.json(
      { error: "JWT_SECRET is not defined" },
      { status: 500 }
    );
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    const email = decoded.email;

    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password
    await updateUserPassword(email, hashedPassword);

    return NextResponse.json(
      { message: "Password has been reset successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to reset password" },
      { status: 500 }
    );
  }
}
