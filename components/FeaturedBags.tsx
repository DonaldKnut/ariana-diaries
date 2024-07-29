// FeaturedBags.tsx
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { BsFillCartPlusFill } from "react-icons/bs";
import { IProduct } from "../models/Product";
import { useCart } from "../context/CartContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const FeaturedBags = () => {
  const { addToCart } = useCart();
  const { resolvedTheme } = useTheme();
  const [bags, setBags] = useState<IProduct[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchBags = async () => {
      try {
        const res = await fetch("/api/bags");
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        if (Array.isArray(data)) {
          setBags(data);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error: any) {
        console.error("Error fetching bags:", error);
        setError(error.message);
      }
    };

    fetchBags();
  }, []);

  const getTextColor = () => {
    return resolvedTheme === "dark" ? "text-white" : "text-black";
  };

  const handleAddToCart = async (item: IProduct) => {
    if (!session) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: item._id, quantity: 1 }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      addToCart(data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (bags.length === 0) {
    return null; // No featured items, return null to render nothing
  }

  return (
    <div className="w-screen overflow-x-scroll">
      <div className="w-max flex">
        {bags.map((item) => (
          <div
            key={item._id.toString()} // Convert ObjectId to string
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
        ))}
      </div>
    </div>
  );
};

export default FeaturedBags;
