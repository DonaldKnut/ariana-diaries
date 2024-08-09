"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import React from "react";
import { RiArrowRightUpLine } from "react-icons/ri";
import { ProductType } from "../../../types/types";
import "./page.css";
import { Reveal } from "../../reveal";

const getData = async () => {
  const res = await fetch("/api/category", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const MenuPage = () => {
  const [categories, setCategories] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        setCategories(data.data); // Access the 'data' property here
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-4 mt-[120px] grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 text-[#f3be2d]">
      {categories.map((category: ProductType) => (
        <Link
          href={`/menu/${category.slug}`}
          key={category.id}
          className="group relative rounded-[15px] overflow-hidden shadow-lg transition-transform transform hover:scale-105 h-80 bg-gradient-to-br from-[#ecc030] to-[#725601] p-6 flex items-end justify-center"
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity group-hover:bg-opacity-60"></div>
          <div className="relative z-10 text-center text-white p-4 rounded-lg backdrop-blur-md bg-opacity-30 bg-black transition-transform transform group-hover:translate-y-[-10px]">
            <Reveal>
              <h1 className="uppercase font-extrabold text-3xl mb-2 tracking-widest">
                {category.title}
              </h1>
            </Reveal>
            <Reveal>
              <p className="text-sm mb-4 menu_desc-description leading-relaxed">
                {category.desc}
              </p>
            </Reveal>
            <Reveal>
              <button
                className={`relative overflow-hidden flex items-center bg-[#d1bf47] text-[#333333] hover:text-[#ffea64] py-2 px-6 rounded-full text-sm font-semibold transition-all duration-300 ease-in-out shadow-lg transform group-hover:scale-110`}
              >
                <span className="relative z-20">Explore</span>
                <RiArrowRightUpLine className="ml-2 relative z-20" />
                <div className="absolute inset-0 bg-[#675815] transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out z-10"></div>
              </button>
            </Reveal>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuPage;
