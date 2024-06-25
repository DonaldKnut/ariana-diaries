import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import UserModel, { UserDocument } from "../../../../../models/User";
import { connect } from "../../../../../database/index";
import { signJwtToken } from "../../../../../lib/jwt";

// Extend the default User interface
declare module "next-auth" {
  interface User {
    _id: string;
    accessToken?: string;
  }

  interface Session {
    user: {
      _id: string;
      accessToken?: string;
    } & User;
  }
}

// Extend the default JWT interface
declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
    accessToken?: string;
  }
}

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
      throw new Error("Invalid email or password");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Invalid email or password");
    } else {
      const currentUser = user.toObject() as UserDocument;
      const accessToken = signJwtToken(currentUser, { expiresIn: "7d" });

      return {
        ...currentUser,
        accessToken,
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
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          _id: token._id,
          accessToken: token.accessToken,
        };
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
