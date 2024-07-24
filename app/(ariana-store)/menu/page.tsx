"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import React from "react";
import { RiArrowRightUpLine } from "react-icons/ri";
import { ProductType } from "../../../types/types";
import "./page.css";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/category", {
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
    <div className="p-4 mt-[120px] grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 text-[#f3be2d]">
      {categories.map((category: ProductType) => (
        <Link
          href={`/menu/${category.slug}`}
          key={category.id} // Use _id instead of id
          className="relative rounded-[13px] w-full h-60 md:h-80 bg-[#a4900f] p-8 pt-24 flex items-end justify-center"
          style={{
            backgroundImage: `url(${category.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className={`text-${category.color} bg-black bg-opacity-50 p-4 rounded-lg`}
          >
            <h1 className="uppercase font-bold text-3xl">{category.title}</h1>
            <p className="text-sm my-8 menu_desc-description">
              {category.desc}
            </p>
            <button
              className={`flex items-center mb-5 bg-[#828238] hover:bg-[#6e6a41] hover:text-[#ffea64] text-${
                category.color === "black" ? "white" : "#b2b20a"
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
