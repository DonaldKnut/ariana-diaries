"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { MdOutlineArrowOutward } from "react-icons/md";
import { useTheme } from "next-themes";

const data = [
  {
    id: 1,
    title: "Whats Happening in Finance.",
    image: "/slide1.webp",
    link: "/finance",
  },
  {
    id: 2,
    title: "Lets Talk Fashion",
    image: "/slide2.webp",
    link: "/fashion",
  },
  {
    id: 3,
    title: "Elevate Your Style, Exude Confidence.",
    image: "/slide3.jpeg",
    link: "/style",
  },
  {
    id: 4,
    title: "Engaging Speakers with Innovative Ideas",
    image: "/slide4.png",
    link: "/speakers",
  },
  {
    id: 5,
    title: "Unlock Your Potential & Transform Your Mindset.",
    image: "/sapiens.png",
    link: "/mindset",
  },
];

const BlogSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { resolvedTheme } = useTheme();

  const getTextColor = () => {
    return resolvedTheme === "dark" ? "text-white" : "text-black";
  };

  useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1)),
      8000 // Adjusted interval to 8000ms (8 seconds)
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-[106px] flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row">
      {/* IMAGE CONTAINER */}
      <div className="w-full flex-1 relative">
        <Image
          src={data[currentSlide].image}
          alt={data[currentSlide].title}
          fill
          className="object-cover"
        />
      </div>
      {/* TEXT CONTAINER */}
      <div
        className={`flex-1 flex items-center justify-center flex-col gap-8 font-bold ${getTextColor()}`}
      >
        <h1 className="text-5xl text-center uppercase p-4 md:p-10 md:text-6xl xl:text-7xl">
          {data[currentSlide].title}
        </h1>
        <Link href={data[currentSlide].link} passHref>
          <Button className="bg-[#c0ab67] hover:bg-[#544d07] text-white py-4 px-8 mb-4 flex items-center">
            Read Now <MdOutlineArrowOutward className="ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BlogSlider;
