// lib/session.ts
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../app/(auth)/api/auth/[...nextauth]/route"; // Adjust the path as necessary

export async function getSession(req: NextRequest) {
  return await getServerSession({ req, ...authOptions });
}
