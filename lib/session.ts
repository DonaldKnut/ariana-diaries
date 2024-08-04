// lib/session.ts
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../authOptions/authOptions";

export async function getSession(req: NextRequest) {
  return await getServerSession({ req, ...authOptions });
}
