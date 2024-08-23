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
          AN INVITATION TO INTENTIONAL LIVING
        </h1>
        <p className="text-white text-sm md:text-base xl:text-xl">
          Research published by the American Pyschological Asscociation (APA)
          highlights that intentional goal setting and daily planning
          significantly improve personal productivity and well-being.
        </p>
        <CountDown />
        <button className="bg-[#b8a970] flex gap-3 items-center justify-center mb-2 hover:bg-[#97853c] text-white rounded-md py-3 px-6">
          Order Now <HiArrowTopRightOnSquare />
        </button>
      </div>
      {/* IMAGE CONTAINER */}
      <div className="flex-1 w-full relative md:h-full h-48">
        <Image
          src="https://res.cloudinary.com/dqrbn3bif/image/upload/v1724393283/ne7q42x6rmbeam5cbufa.png"
          alt="Book Image"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default Offer;
