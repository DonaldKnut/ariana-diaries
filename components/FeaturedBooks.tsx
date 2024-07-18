"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { BsFillCartPlusFill } from "react-icons/bs";
import { IProduct } from "../models/Product";
// import { useCart } from "../context/CartContext";
import { useCartStore } from "../utils/store";

const FeaturedBooks = () => {
  const { addToCart } = useCartStore();
  const { resolvedTheme } = useTheme();
  const [books, setBooks] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("/api/books");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        if (Array.isArray(data)) {
          setBooks(data);
        } else {
          console.error("Expected an array but got:", data);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const getTextColor = () => {
    return resolvedTheme === "dark" ? "text-white" : "text-black";
  };

  const handleAddToCart = (item: IProduct) => {
    addToCart({
      id: item.id, // Assuming id is a unique identifier
      title: item.title,
      price: item.price,
      quantity: 1, // Start with quantity 1 when adding to cart
    });
  };

  return (
    <div className="w-screen overflow-x-scroll">
      <div className="w-max flex">
        {books.length === 0 ? (
          <div className="flex items-center justify-center min-h-screen">
            No books available.
          </div>
        ) : (
          books.map((item) => (
            <div
              key={item.id}
              className={`w-screen h-[60vh] flex flex-col items-center justify-around p-4 hover:bg-[#6f6a45] hover:text-white transition-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h-[90vh] ${getTextColor()}`}
            >
              {item.img && (
                <div className="relative flex-1 w-full hover:rotate-[60deg] transition-all duration-500">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
                <h1 className="text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl">
                  {item.title}
                </h1>
                <p className="p-4 2xl:p-8">{item.desc}</p>
                <span className="text-xl font-bold">${item.price}</span>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="flex bg-[#c0ab67] hover:bg-[#544d07] items-center justify-center pl-3 pr-3 text-white p-2 rounded-md"
                >
                  Add to Cart <BsFillCartPlusFill className="ml-2" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FeaturedBooks;
