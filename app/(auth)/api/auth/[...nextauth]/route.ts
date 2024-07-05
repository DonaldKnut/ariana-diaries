import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import UserModel, { UserDocument } from "../../../../../models/User";
import { connect } from "../../../../../database/index";
import { signJwtToken } from "../../../../../lib/jwt";

// Authorization function to validate user credentials
async function authorize(
  credentials: Record<string, string> | undefined
): Promise<User | null> {
  await connect();

  if (!credentials) {
    throw new Error("No credentials provided");
  }

  const { email, password } = credentials;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error("Incorrect email or password");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Incorrect email or password");
    } else {
      const currentUser = user.toObject() as UserDocument;
      const accessToken = signJwtToken(currentUser, { expiresIn: "7d" });

      return {
        ...currentUser,
        accessToken,
        role: currentUser.isAdmin ? "admin" : "user", // Derive role from isAdmin
        isAdmin: currentUser.isAdmin,
        avatar: currentUser.avatar, // Include avatar property
      } as User;
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || "Login failed. Please try again later.");
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      authorize,
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/auth/error", // custom error page
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token._id = user._id;
        token.role = user.role;
        token.isAdmin = user.isAdmin;
        token.avatar = user.avatar; // Include avatar in token
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          _id: token._id,
          accessToken: token.accessToken,
          role: token.role,
          isAdmin: token.isAdmin,
          avatar: token.avatar, // Include avatar in session
        };
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
