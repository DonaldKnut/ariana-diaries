"use client";

import React from "react";
import { useTheme } from "next-themes";

const Notification = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`h-12 bg-[#aa9321] mt-7 text-white text-center px-4 flex items-center justify-center text-sm md:text-base cursor-pointer ${
        theme === "dark" ? "text-white" : "text-black"
      }`}
    >
      Free delivery for all orders over $70. Order your lifestyle products now!
    </div>
  );
};

export default Notification;
