// http://localhost:3000/api/signup

import User, { UserDocument } from "../../../../models/User";
import bcrypt from "bcrypt";
import { connect } from "../../../../database/index";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    await connect();
    const { name, email, password }: SignUpData = await req.json();
    console.log(name, email);
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

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "POST Error (Sign up)" });
  }
}
