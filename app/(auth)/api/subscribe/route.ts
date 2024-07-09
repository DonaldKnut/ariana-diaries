import { NextRequest, NextResponse } from "next/server";
import nodemailer, { Transporter, SendMailOptions } from "nodemailer";
import nodemailerExpressHandlebars from "nodemailer-express-handlebars";
import path from "path";
import fs from "fs";
import handlebars from "handlebars";

// Define the transporter
const transporter: Transporter = nodemailer.createTransport({
  service: "gmail", // or any email service you prefer
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // your email password
  },
});

// Define the Handlebars options
const handlebarOptions = {
  viewEngine: {
    extName: ".hbs",
    partialsDir: path.resolve("./emailTemplates/"),
    layoutsDir: path.resolve("./emailTemplates/"),
    defaultLayout: "", // Set to empty string instead of false
  },
  viewPath: path.resolve("./emailTemplates/"),
  extName: ".hbs",
};

// Use the Handlebars plugin with the created instance
(transporter as any).use(
  "compile",
  nodemailerExpressHandlebars(handlebarOptions)
);

const compileTemplate = async (templateName: string, context: any) => {
  const filePath = path.resolve(
    handlebarOptions.viewPath,
    `${templateName}.hbs`
  );
  const source = fs.readFileSync(filePath, "utf8");
  const template = handlebars.compile(source);
  return template(context);
};

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
    const html = await compileTemplate("confirmation", {
      email,
      logoUrl:
        "https://res.cloudinary.com/dtujpq8po/image/upload/v1720111312/serwo4nb3uieilurt2eh.png",
    });

    // Send confirmation email
    const mailOptions: SendMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Subscription Confirmation",
      html,
    };

    await transporter.sendMail(mailOptions);

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
