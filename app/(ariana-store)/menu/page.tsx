"use client";
import { menu } from "../../../data";
import Link from "next/link";
import React from "react";
import { RiArrowRightUpLine } from "react-icons/ri";

// import Button from "../../../components/button";

const MenuPage = () => {
  return (
    <div className="p-4 mt-[120px] h-[249px] flex flex-col md:flex-row items-center">
      {menu.map((category) => (
        <Link
          href={`/menu/${category.slug}`}
          key={category.id}
          className="w-full h-auto md:h-[52vh] bg-cover p-8 pt-24 md:mb-0 md:mr-2"
          style={{ backgroundImage: `url(${category.img})` }}
        >
          <div className={`text-${category.color} w-[40%] md:w-1/2`}>
            <h1 className="uppercase font-bold text-3xl">{category.title}</h1>
            <p className="text-sm my-8 ">{category.desc}</p>
            <button
              className={`flex items-center mb-5 bg-[#9e801e] hover:bg-[#6e6a41] hover:text-[#ffea64] text-${
                category.color === "black" ? "white" : "green-500"
              } py-2 px-4 rounded-md`}
            >
              Explore <RiArrowRightUpLine className="ml-2" />
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuPage;
