"use client";
import "./page.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import { BsFillArrowUpRightSquareFill } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";
import { MdOutlineArrowCircleRight } from "react-icons/md";
import { IoCheckmarkCircleSharp, IoCloseCircleSharp } from "react-icons/io5";
import { Reveal } from "./reveal";

export default function Home() {
  const [displayText, setDisplayText] = useState("");
  const originalText = "Welcome to Ariana Diaries";
  const typingSpeed = 100; // Adjust typing speed here
  const [cloudinaryData, setCloudinaryData] = useState(null);
  const cloudinaryUrl =
    "https://res.cloudinary.com/dtujpq8po/video/upload/v1716467001/lhakq5gmxqxtewwxxcct.mp4";

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

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

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    if (!validateEmail(email)) {
      setMessage("Invalid email address.");
      setIsSuccess(false);
      setTimeout(() => setMessage(""), 3000); // Hide message after 3 seconds
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      setLoading(false);
      if (response.ok) {
        setIsSuccess(true);
        setMessage("Subscribed!");
        setEmail("");
      } else {
        setIsSuccess(false);
        setMessage(result.message || "Subscription failed.");
      }
    } catch (error) {
      setLoading(false);
      setIsSuccess(false);
      setMessage("Subscription failed.");
    }

    setTimeout(() => setMessage(""), 3000); // Hide message after 3 seconds
  };

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
                  {/* <Reveal>
                    <p className="mb-3 text-base font-medium leading-relaxed">
                      Embarking on a journey of inspiration, empowerment, and
                      discovery in the vast waves of possibilities and horizons.
                    </p>
                  </Reveal> */}
                  <div className="flex flex-col gap-3 items-center justify-center">
                    <div className="mt-12 w-[230px] lg:w-[450px]">
                      <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
                        Subscribe to Our Newsletter
                      </h2>
                      <form
                        onSubmit={handleSubscribe}
                        className="mt-6 flex flex-col sm:flex-row sm:items-center"
                      >
                        <input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-2 mb-4 text-zinc-800 bg-zinc-100 border border-zinc-300 rounded-md dark:bg-zinc-700 dark:text-zinc-100 dark:border-zinc-600 sm:mr-4 sm:mb-0"
                        />
                        <button
                          type="submit"
                          className="flex items-center justify-center gap-2 px-6 py-2 text-white bg-[#846b31] rounded-md hover:bg-[#8e801ad0] transition-all ease-out"
                          disabled={loading} // Disable button when loading
                        >
                          {loading ? (
                            <FaSpinner className="animate-spin" size={24} /> // Display spinner when loading
                          ) : (
                            <>
                              Subscribe <MdOutlineArrowCircleRight />
                            </>
                          )}
                        </button>
                      </form>
                      {message && (
                        <div
                          className={`mt-4 flex items-center justify-center gap-2 border rounded-md ${
                            isSuccess
                              ? "border-green-500 bg-green-100 text-green-700"
                              : "border-red-500 text-red-700"
                          }`}
                        >
                          {/* {isSuccess ? (
                            <IoCheckmarkCircleSharp size={24} />
                          ) : (
                            <IoCloseCircleSharp size={24} />
                          )} */}
                          <p>{message}</p>
                        </div>
                      )}
                    </div>
                    <Link href="/menu" passHref className="z-15">
                      <Reveal>
                        <div className="flex link_btn justify-center items-center gap-3 py-4 px-8 rounded-md text-base font-semibold text-white">
                          <span>Explore</span>
                          <BsFillArrowUpRightSquareFill />
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
