// next-auth.d.ts

import "next-auth";

declare module "next-auth" {
  interface User {
    _id: string;
    accessToken: string;
    role: string;
    isAdmin: boolean;
    avatar?: {
      url: string;
    };
    email: string;
    name: string;
    password: string;
    designation?: string;
    age?: string;
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
    accessToken: string;
    role: string;
    isAdmin: boolean;
    avatar?: {
      url: string;
    };
    email: string;
    name: string;
    designation?: string;
    age?: string;
  }
}
