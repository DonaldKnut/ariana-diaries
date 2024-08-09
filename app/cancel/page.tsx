"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { BsBoxArrowUpRight } from "react-icons/bs";

const CancelPage = () => {
  const router = useRouter();

  const handleReturnToShop = () => {
    router.push("/shop");
  };

  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-[#c5a247] items-center justify-center mt-[130px]">
      <div className="text-center">
        <Image
          src="/no-cat.png" // Assuming you have a suitable image
          alt="Transaction Cancelled"
          width={200}
          height={200}
        />
        <h1 className="uppercase text-3xl font-bold mt-6">
          Transaction Cancelled
        </h1>
        <p className="text-xl mt-4">Your order was not processed.</p>
        <p className="text-md mt-2">
          If you have any questions, feel free to{" "}
          <Link href="/contact" className="text-[#c0a928] hover:underline">
            contact us
          </Link>
          .
        </p>
        <button
          onClick={handleReturnToShop}
          className="flex items-center justify-center p-2 mt-6 bg-[#c5a247] text-[#4a3b0e] rounded-lg hover:bg-[#4a3b0e] hover:text-[#c5a247] transition-all duration-300 ease-out cursor-pointer"
        >
          <span className="mr-2">Return to Shop</span>
          <BsBoxArrowUpRight />
        </button>
      </div>
    </div>
  );
};

export default CancelPage;
