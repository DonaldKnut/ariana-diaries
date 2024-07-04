"use client";
// Navbar.js
import React, { useState } from "react";
import Menu from "./Menu";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
// import CartIconBeta from "./CartIconBeta";

const Navbar = () => {
  const { resolvedTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const user = useSession();

  const toggleMenu = () => {
    setOpen(!open);
  };

  // Function to determine the text color based on the theme
  const getTextColor = () => {
    return resolvedTheme === "dark" ? "text-white" : "text-black";
  };

  return (
    <div
      className={`h-12 p-4 flex items-center justify-between border-b-2 border-b-[#dec573] uppercase md:h-24 lg:px-20 xl:px-40 ${getTextColor()}`}
    >
      {/* LEFT LINKS */}
      <div className="hidden md:flex gap-4 flex-1">
        <Link href="/blogs">Blogs</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/">Contact</Link>
      </div>
      {/* LOGO */}
      <div
        className={`text-xl md:font-bold flex-1 md:text-center ${getTextColor()}`}
      >
        <Link href="/">Ariana Stores</Link>
      </div>
      {/* MOBILE MENU */}
      <div className="md:hidden">
        <Menu />
      </div>
      {/* RIGHT LINKS */}
      <div className="hidden md:flex gap-4 items-center justify-end flex-1">
        <div
          className={`md:absolute top-3 r-2 lg:static flex items-center gap-2 cursor-pointer px-1 rounded-md ${getTextColor()}`}
        >
          <Image src="/phone.png" alt="" width={20} height={20} />
          <a href="tel:+23276350548" className="no-underline">
            Call Us
          </a>
        </div>
        {!user ? (
          <Link href="/login" className={`${getTextColor()}`}>
            Login
          </Link>
        ) : (
          <Link href="/orders" className={`${getTextColor()}`}>
            Orders
          </Link>
        )}
        {/* <CartIconBeta /> */}
      </div>
    </div>
  );
};

export default Navbar;
