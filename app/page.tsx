"use client";
import "./page.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import { Reveal } from "./reveal";

export default function Home() {
  const [displayText, setDisplayText] = useState("");
  const originalText = "Welcome 2 Ariana Diaries";
  const typingSpeed = 100; // Adjust typing speed here
  const [cloudinaryData, setCloudinaryData] = useState(null);
  const cloudinaryUrl =
    "https://res.cloudinary.com/dtujpq8po/video/upload/v1716467001/lhakq5gmxqxtewwxxcct.mp4";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(cloudinaryUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCloudinaryData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [cloudinaryUrl]);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayText(originalText.substring(0, currentIndex + 1));
      currentIndex++;
      if (currentIndex === originalText.length) clearInterval(interval);
    }, typingSpeed);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="main relative z-10 overflow-hidden pt-[120px] pb-16 md:pt-[150px] font-lexend md:pb-[120px] xl:pt-[180px] xl:pb-[160px] 2xl:pt-[210px] 2xl:pb-[200px]">
        <div className="overlay"></div>
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[800px] text-center">
                <div className="text-container">
                  <Reveal>
                    <h1 className="mb-5 text-3xl font-bold leading-tight">
                      {displayText}
                    </h1>
                  </Reveal>
                  <Reveal>
                    <p className="mb-12 text-base font-medium leading-relaxed">
                      Embarking on a journey of inspiration, empowerment, and
                      discovery in the vast waves of possibilities and horizons.
                    </p>
                  </Reveal>
                  <div className="flex gap-3 items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                    <Link href="/menu" passHref className="z-15">
                      <Reveal>
                        <div className="flex link_btn gap-3 py-4 px-8 rounded-md text-base font-semibold text-white">
                          <span>Explore</span>
                          <MdArrowOutward />
                        </div>
                      </Reveal>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <video
              src={cloudinaryUrl}
              autoPlay
              loop
              // muted
              className="video"
            />
          </div>
        </div>
      </section>
    </>
  );
}
