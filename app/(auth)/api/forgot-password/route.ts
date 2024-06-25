// /Users/user/Desktop/ariana-store/app/(auth)/api/forgot-password/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  // Validate email
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    return NextResponse.json(
      { error: "JWT_SECRET is not defined" },
      { status: 500 }
    );
  }

  // Generate a password reset token (you can also store this token in the database)
  const token = jwt.sign({ email }, jwtSecret, { expiresIn: "1h" });

  // Send reset link via email
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Request",
    text: `You requested to reset your password. Click the link below to reset it: \n\n${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      { message: "Password reset link sent" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
