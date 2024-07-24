import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { email } = body;

  if (typeof email !== "string" || !validateEmail(email)) {
    return NextResponse.json(
      { message: "Invalid email address" },
      { status: 400 }
    );
  }

  try {
    // Load the email template
    const templatePath = path.resolve("emailTemplates", "confirmation.ejs");
    const html = await ejs.renderFile(templatePath, {
      email,
      logoUrl:
        "https://res.cloudinary.com/dtujpq8po/image/upload/v1720111312/serwo4nb3uieilurt2eh.png",
    });

    // Configure the email transporter for Gmail
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT as string, 10),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send the email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM as string,
      to: email,
      subject: "Subscription Confirmation",
      html,
    });

    return NextResponse.json({ message: "Subscription successful" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to subscribe" },
      { status: 500 }
    );
  }
};

export const GET = () => {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
};
