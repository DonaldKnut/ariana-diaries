import "./globals.css";
import type { Metadata } from "next";
import NextAuthProvider from "../providers/next-auth-provider";
import NextThemeProvider from "../providers/theme-provider";
import GlobalState from "../context/index";
import Header from "../components/header/index";
import QueryProvider from "../components/QueryProvider";
import AuthProvider from "../components/AuthProvider";
import { ToastContainer } from "react-toastify";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ariana Diaries",
  description: "The go-to platform to better your life.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${dmSans.className}`}>
        <NextThemeProvider>
          <NextAuthProvider>
            <GlobalState>
              <AuthProvider>
                <QueryProvider>
                  <Header />
                  {children}
                  <ToastContainer
                    position="bottom-right"
                    theme="dark"
                    autoClose={3000}
                  />
                </QueryProvider>
              </AuthProvider>
            </GlobalState>
          </NextAuthProvider>
        </NextThemeProvider>
      </body>
    </html>
  );
}
