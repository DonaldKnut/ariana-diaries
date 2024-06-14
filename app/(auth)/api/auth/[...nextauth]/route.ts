import NextAuth, { AuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../../../utils/connect";
import { getServerSession } from "next-auth";

// Declare additional properties for the session and JWT
declare module "next-auth" {
  interface Session {
    user: User & {
      isAdmin: boolean;
    };
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    isAdmin: boolean;
  }
}

// Refactored auth options
const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, token }: any) {
      if (token) {
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    async jwt({ token }: any) {
      const userInDb = await prisma.user.findUnique({
        where: {
          email: token.email!,
        },
      });
      token.isAdmin = userInDb?.isAdmin || false;
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET as string,
};

const nextAuth = NextAuth(authOptions);

export const getAuthSession = () => getServerSession(authOptions);

export { nextAuth as GET, nextAuth as POST };
