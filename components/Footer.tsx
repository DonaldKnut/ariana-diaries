"use client";
import Link from "next/link";
import React from "react";
import { useTheme } from "next-themes";

const Footer = () => {
  const { theme } = useTheme();

  return (
    <div className="h-12 md:h-24 p-4 lg:px-20 xl:px-40 flex items-center justify-between">
      <Link
        href="/"
        className={`font-bold text-xl ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        Ariana Store
      </Link>
      <p className={theme === "dark" ? "text-white" : "text-black"}>
        © ALL RIGHTS RESERVED.
      </p>
    </div>
  );
};

export default Footer;
