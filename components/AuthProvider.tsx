// components/AuthProvider.tsx
"use client";
import React from "react";
import { SessionProvider } from "next-auth/react"; // Assuming next-auth/react is correctly installed and imported

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Your authentication logic can be implemented here if needed

  return <SessionProvider session={null}>{children}</SessionProvider>;
};

export default AuthProvider;
