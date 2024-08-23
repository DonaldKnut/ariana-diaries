"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { BsFillCartPlusFill } from "react-icons/bs";
import { IProduct } from "../models/Product";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Notification from "../constants/Notification";
import { useCartStore } from "../utils/store";

const FeaturedBooks = () => {
  const { addToCart } = useCartStore();
  const { resolvedTheme } = useTheme();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookList, setBookList] = useState<IProduct[]>([]);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(
    null
  );
  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "success"
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookList = async () => {
      try {
        const response = await fetch("/api/books");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Expected JSON response");
        }

        const data = await response.json();
        console.log("Fetched books:", data);

        if (Array.isArray(data)) {
          const validBooks = data.filter((book) => book._id);
          setBookList(validBooks);
        } else {
          console.error("Expected an array but got:", data);
          throw new Error("Data format error: Expected an array.");
        }
      } catch (error) {
        console.error("Error fetching books:", error);
        setNotificationMessage("Failed to load books.");
        setNotificationType("error");
      } finally {
        setLoading(false);
      }
    };

    fetchBookList();
  }, []);

  const getTextColor = () => {
    return resolvedTheme === "dark" ? "text-white" : "text-black";
  };

  const handleAddToCart = (item: IProduct) => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
      return;
    }

    addToCart({
      id: item._id.toString(),
      title: item.title,
      price: item.price,
      quantity: 1,
    });

    setNotificationMessage(`"${item.title}" has been added to your cart!`);
    setNotificationType("success");

    const timeoutId = setTimeout(() => {
      setNotificationMessage(null);
    }, 3000);

    return () => clearTimeout(timeoutId);
  };

  const handleNotificationClose = () => {
    setNotificationMessage(null);
  };

  return (
    <div className="w-screen overflow-x-scroll">
      {notificationMessage && (
        <Notification
          message={notificationMessage}
          type={notificationType}
          onClose={handleNotificationClose}
        />
      )}
      <div className="w-max flex">
        {loading ? (
          <div className="flex items-center justify-center min-h-screen">
            Loading books...
          </div>
        ) : bookList.length === 0 ? (
          <div className="flex items-center justify-center min-h-screen">
            No books available.
          </div>
        ) : (
          bookList.map((item) => (
            <div
              key={item._id.toString()}
              className={`w-screen h-[60vh] flex flex-col items-center justify-around p-4 hover:bg-[#6f6a45] hover:text-white transition-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h-[90vh] ${getTextColor()}`}
            >
              {item.img ? (
                <div className="relative flex-1 w-full hover:rotate-[60deg] transition-all duration-500">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-contain"
                    onError={(e) => {
                      e.currentTarget.src = "/path/to/fallback/image.jpg"; // Fallback image
                    }}
                  />
                </div>
              ) : (
                <div className="flex-1 w-full flex items-center justify-center">
                  <span>No Image Available</span>
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
                  aria-label={`Add ${item.title} to cart`}
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
