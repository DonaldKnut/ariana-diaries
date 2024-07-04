"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";

const ErrorPage: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen p-4 lg:p-24">
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
        <Image
          src="/error-img.png"
          alt="404 Error"
          className="mb-6"
          width="520"
          height="520"
        />
      </div>
      <div className="w-full lg:w-1/2 text-center lg:text-left lg:ml-8">
        <Image src="/404.png" alt="404 image" width={200} height={200} />
        <p className="text-lg text-[#948e1c] mb-8 w-[70%] mt-7">
          Some places are great to lose yourself in, but not on this occasion,
          you can return to home page.
        </p>
        <Link href="/">
          <button className="inline-flex items-center bg-[#b29c20] text-white py-2 px-4 rounded hover:bg-[#70631e] transition">
            Homepage{" "}
            <AiOutlineArrowRight className="ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-2" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
