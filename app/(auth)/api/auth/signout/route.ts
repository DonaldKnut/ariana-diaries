import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../../database"; // Adjust the path as necessary
import { getSession } from "../../../../../lib/session"; // Adjust the path as necessary
import { Session } from "next-auth"; // Ensure you import the correct types

export async function POST(req: NextRequest) {
  await connect(); // Ensure database connection

  // Retrieve the session using the request
  const session = (await getSession(req)) as Session | null;
  console.log("Session retrieved:", session);

  if (session) {
    try {
      const userId = session.user?._id; // Correctly access the user ID
      if (!userId) {
        console.error("User ID not found in session");
        return NextResponse.json(
          { message: "Failed to sign out: User ID not found" },
          { status: 500 }
        );
      }
      // Invalidate the session in the database
      await invalidateSession(userId); // Replace with your session invalidation logic

      // Destroy the session cookie
      const response = NextResponse.json({
        message: "Signed out successfully",
      });
      response.cookies.set("next-auth.session-token", "", { maxAge: -1 }); // Adjust the cookie name if necessary

      return response;
    } catch (error) {
      console.error("Error during sign-out:", error);
      return NextResponse.json(
        { message: "Failed to sign out" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
}

export function OPTIONS() {
  return NextResponse.json({}, { status: 204 });
}

// Function to invalidate the session in the database
async function invalidateSession(userId: string) {
  // Replace this with your actual session invalidation logic
  console.log(`Invalidating session for user ID: ${userId}`);
  // Example: await SessionModel.deleteMany({ userId });
}
