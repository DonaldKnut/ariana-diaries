import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { connect } from "../../../../database";
import { authOptions } from "../../../../authOptions/authOptions";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const userEmail = session.user?.email;

  try {
    const { db } = await connect();
    const user = await db.collection("users").findOne({ email: userEmail });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { password, verificationToken, ...userWithoutSensitiveData } = user;

    return NextResponse.json(userWithoutSensitiveData, { status: 200 });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Error fetching user data" },
      { status: 500 }
    );
  }
}
