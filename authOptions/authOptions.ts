import { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import UserModel, { UserDocument } from "../models/User";
import { connect } from "../database";
import { signJwtToken } from "../lib/jwt";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

interface AuthenticatedUser extends UserDocument {
  id: string;
  accessToken: string;
  role: string;
  avatar: {
    id: string;
    url: string;
  };
  isAdmin: boolean;
  _id: string;
}

async function authorize(
  credentials: Record<string, string> | undefined
): Promise<User | null> {
  await connect();

  if (!credentials || !credentials.email || !credentials.password) {
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
    }

    const currentUser = user.toObject() as UserDocument;
    const accessToken = signJwtToken(currentUser, { expiresIn: "7d" });

    return {
      ...currentUser,
      id: currentUser._id.toString(),
      accessToken,
      role: currentUser.isAdmin ? "admin" : "user",
      isAdmin: currentUser.isAdmin,
      avatar: currentUser.avatar,
      _id: currentUser._id.toString(),
    } as AuthenticatedUser;
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(error.message || "Login failed. Please try again later.");
    }
    throw new Error("Login failed. Please try again later.");
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      authorize,
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        const authenticatedUser = user as AuthenticatedUser;
        token.accessToken = authenticatedUser.accessToken;
        token._id = authenticatedUser._id;
        token.role = authenticatedUser.role;
        token.isAdmin = authenticatedUser.isAdmin;
        token.avatar = authenticatedUser.avatar;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user = {
          ...session.user,
          _id: token._id,
          accessToken: token.accessToken,
          role: token.role,
          isAdmin: token.isAdmin,
          avatar: token.avatar,
        };
      }
      return session;
    },
  },
};
