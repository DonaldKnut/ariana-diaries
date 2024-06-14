"use client";
import { lifestyleProducts } from "../data";
import Image from "next/image";
import React from "react";
import { useTheme } from "next-themes";
import { BsFillCartPlusFill } from "react-icons/bs";

const Featured = () => {
  const { resolvedTheme } = useTheme();

  const getTextColor = () => {
    return resolvedTheme === "dark" ? "text-white" : "text-black";
  };

  return (
    <div className="w-screen overflow-x-scroll">
      {/* WRAPPER */}
      <div className="w-max flex">
        {/* SINGLE ITEM */}
        {lifestyleProducts.map((item) => (
          <div
            key={item.id}
            className="w-screen h-[60vh] flex flex-col items-center justify-around p-4 hover:bg-[#6f6a45] hover:text-white transition-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h-[90vh]"
          >
            {/* IMAGE CONTAINER */}
            {item.img && (
              <div className="relative flex-1 w-full hover:rotate-[60deg] transition-all duration-500">
                <Image src={item.img} alt="" fill className="object-contain" />
              </div>
            )}
            {/* TEXT CONTAINER */}
            <div
              className={`flex-1 flex flex-col items-center justify-center text-center gap-4 ${getTextColor()}`}
            >
              <h1 className="text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl">
                {item.title}
              </h1>
              <p className="p-4 2xl:p-8">{item.desc}</p>
              <span className="text-xl font-bold">${item.price}</span>
              <button className="flex bg-[#c0ab67] hover:bg-[#544d07] items-center justify-center pl-3 pr-3 text-white p-2 rounded-md">
                Add to Cart <BsFillCartPlusFill className="ml-2" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
