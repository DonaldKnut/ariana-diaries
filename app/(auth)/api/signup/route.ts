import User, { UserDocument } from "../../../../models/User";
import bcrypt from "bcrypt";
import { connect } from "../../../../database/index";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import nodemailer from "nodemailer";
import hbs, {
  NodemailerExpressHandlebarsOptions,
} from "nodemailer-express-handlebars";
import path from "path";

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    await connect();
    const { name, email, password }: SignUpData = await req.json();
    const isExisting: UserDocument | null = await User.findOne({ email });

    if (isExisting) {
      return NextResponse.json({ ErrorMessage: "User already exists" });
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const newUser: UserDocument = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Configure Nodemailer to use Handlebars
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const handlebarOptions: NodemailerExpressHandlebarsOptions = {
      viewEngine: {
        extname: ".hbs",
        partialsDir: path.resolve("./emailTemplates/"),
        layoutsDir: path.resolve("./emailTemplates/"),
        defaultLayout: "",
      },
      viewPath: path.resolve("./emailTemplates/"),
      extName: ".hbs",
    };

    transporter.use("compile", hbs(handlebarOptions));

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: newUser.email,
      subject: "Welcome to Ariana Diaries!",
      template: "welcome", // Name of the template file without extension
      context: {
        name: newUser.name,
        logoUrl:
          "https://res.cloudinary.com/dtujpq8po/image/upload/v1720111312/serwo4nb3uieilurt2eh.png",
      },
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Welcome email sent to:", newUser.email);
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError);
    }

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "POST Error (Sign up)" });
  }
}
