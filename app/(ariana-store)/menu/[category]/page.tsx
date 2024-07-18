// CategoryPage component
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { ProductType } from "../../../../types/types";

type Props = {
  params: { category: string };
};

const getData = async (category: string) => {
  const res = await fetch(`/api/products?cat=${category}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const CategoryPage = ({ params }: Props) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const { category } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(category);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [category]);

  return (
    <div className="flex flex-wrap text-[#79722e]">
      {products.map((item) => (
        <Link
          className="w-full h-[60vh] border-r-2 border-b-2 border-[#a3972e] sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group odd:bg-[#e6e0b4]"
          href={`/product/${item.id}`}
          key={item.id}
        >
          {/* IMAGE CONTAINER */}
          {item.img && (
            <div className="relative h-[80%]">
              <Image src={item.img} alt="" fill className="object-contain" />
            </div>
          )}
          {/* TEXT CONTAINER */}
          <div className="flex items-center justify-between font-bold">
            <h1 className="text-2xl uppercase p-2">{item.title}</h1>
            <h2 className="group-hover:hidden text-xl">${item.price}</h2>
            <button className="hidden group-hover:block uppercase bg-[#948636] text-white p-2 rounded-md">
              Add to Cart
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryPage;
