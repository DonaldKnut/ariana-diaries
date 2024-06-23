// pages/api/auth/session.ts (adjust path as per your structure)

import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react"; // Example, adjust based on your setup

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });

    if (session) {
      // Optionally fetch user data from MongoDB based on session info
      // Example: const user = await UserModel.findOne({ email: session.user.email });
      // Adjust logic as per your needs

      res.status(200).json(session);
    } else {
      res.status(401).json({ message: "No session found" });
    }
  } catch (error) {
    console.error("Error fetching session:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
