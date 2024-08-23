"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { MdOutlineArrowOutward } from "react-icons/md";
import { useTheme } from "next-themes";

const data = [
  {
    id: 1,
    title: "Capture Memories & Cherish Moments.",
    image: "/shared_.png",
  },
  {
    id: 2,
    title: "Inspire Creativity & Embrace Artistry",
    image: "/slide2.webp",
  },
  {
    id: 3,
    title: "Elevate Your Style, Exude Confidence.",
    image: "/slide3.jpeg",
  },
  {
    id: 4,
    title: "Engaging Speakers with Innovative Ideas",
    image: "/ariana_iv.jpeg",
  },
  {
    id: 5,
    title: "Unlock Your Potential & Transform Your Mindset.",
    image: "/ariana_book.png",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { resolvedTheme } = useTheme();

  const getTextColor = () => {
    return resolvedTheme === "dark" ? "text-white" : "text-black";
  };

  useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1)),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row">
      {/* TEXT CONTAINER */}
      <div
        className={`flex-1 flex items-center justify-center flex-col gap-8 font-bold ${getTextColor()}`}
      >
        <h1 className="text-5xl text-center uppercase p-4 md:p-10 md:text-6xl xl:text-7xl">
          {data[currentSlide].title}
        </h1>
        <Button className="bg-[#c0ab67] hover:bg-[#544d07] text-white py-4 px-8 mb-4">
          Explore <MdOutlineArrowOutward className="ml-2" />
        </Button>
      </div>
      {/* IMAGE CONTAINER */}
      <div className="w-full flex-1 relative">
        <Image
          src={data[currentSlide].image}
          alt=""
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Slider;
