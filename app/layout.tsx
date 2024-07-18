import "./globals.css";
import type { Metadata } from "next";
import NextAuthProvider from "../providers/next-auth-provider";
import NextThemeProvider from "../providers/theme-provider";
import GlobalState from "../context/index";
import Header from "../components/header/index";
import QueryProvider from "../components/QueryProvider";
import AuthProvider from "../components/AuthProvider";
import { ToastContainer } from "react-toastify";
import { Cabin } from "next/font/google"; // Import Cabin font
import { CartProvider } from "../context/CartContext";

const cabin = Cabin({
  weight: "400", // Font weight
  subsets: ["latin"], // Subsets (optional)
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
      <body className={`${cabin.className}`}>
        <NextThemeProvider>
          <NextAuthProvider>
            <GlobalState>
              <AuthProvider>
                <QueryProvider>
                  <CartProvider>
                    <Header />
                    {children}
                    <ToastContainer
                      position="bottom-right"
                      theme="dark"
                      autoClose={3000}
                    />
                  </CartProvider>
                </QueryProvider>
              </AuthProvider>
            </GlobalState>
          </NextAuthProvider>
        </NextThemeProvider>
      </body>
    </html>
  );
}
