// next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface User {
    _id: string;
    accessToken?: string;
    role: string;
    isAdmin: boolean; // Add the isAdmin property here
  }

  interface Session {
    user: {
      _id: string;
      accessToken?: string;
      role: string;
      isAdmin: boolean; // Add the isAdmin property here
    } & User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
    accessToken?: string;
    role: string;
    isAdmin: boolean; // Add the isAdmin property here
  }
}
