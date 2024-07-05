// next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface User {
    _id: string;
    accessToken?: string;
    role: string;
    isAdmin: boolean;
    avatar?: {
      url: string;
    }; // Add the avatar property here
  }

  interface Session {
    user: {
      _id: string;
      accessToken?: string;
      role: string;
      isAdmin: boolean;
      avatar?: {
        url: string;
      }; // Add the avatar property here
    } & User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
    accessToken?: string;
    role: string;
    isAdmin: boolean;
    avatar?: {
      url: string;
    }; // Add the avatar property here
  }
}
