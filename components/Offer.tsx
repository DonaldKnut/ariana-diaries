import Image from "next/image";
import React from "react";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import CountDown from "./CountDown";

const Offer = () => {
  return (
    <div className="bg-[#524610] h-auto md:h-[70vh] rounded-[22px] mt-12 flex flex-col md:flex-row md:justify-between md:bg-[url('/offerBg.png')]">
      {/* TEXT CONTAINER */}
      <div className="flex-1 flex flex-col justify-center items-center text-center gap-8 p-6">
        <h1 className="text-white text-xl md:text-2xl xl:text-6xl font-bold">
          Develop your Mindset and Orientation
        </h1>
        <p className="text-white text-sm md:text-base xl:text-xl">
          Progressively simplify effective e-toilers and process-centric methods
          of empowerment. Quickly pontificate parallel.
        </p>
        <CountDown />
        <button className="bg-[#b8a970] flex gap-3 items-center justify-center mb-2 hover:bg-[#97853c] text-white rounded-md py-3 px-6">
          Order Now <HiArrowTopRightOnSquare />
        </button>
      </div>
      {/* IMAGE CONTAINER */}
      <div className="flex-1 w-full relative md:h-full h-48">
        <Image
          src="/books/thesubtleart.png"
          alt="Book Image"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default Offer;
