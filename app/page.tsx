"use client";
import React, { useEffect, useState } from "react";
import "./page.css";
import Link from "next/link";
import { BsFillArrowUpRightSquareFill } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";
import { MdOutlineArrowCircleRight } from "react-icons/md";
import { Reveal } from "./reveal";
import { z } from "zod";
import Popup from "../components/Popup";

export default function Home() {
  const [displayText, setDisplayText] = useState("");
  const originalText = "Welcome to Ariana Diaries";
  const typingSpeed = 100; // Adjust typing speed here
  const [cloudinaryData, setCloudinaryData] = useState(null);
  const cloudinaryUrl =
    "https://res.cloudinary.com/dqrbn3bif/video/upload/v1724336397/ftiooflk99dborwzsw0a.mp4";

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

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

  const emailSchema = z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address");

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    const emailValidation = emailSchema.safeParse(email);

    if (!emailValidation.success) {
      setMessage(emailValidation.error.errors[0].message);
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
        setShowPopup(true);
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
                  <div className="flex flex-col gap-3 items-center justify-center">
                    <div className="mt-12 w-[230px] lg:w-[450px]">
                      <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
                        Subscribe to Our Newsletter
                      </h2>
                      <form
                        onSubmit={handleSubscribe}
                        className="mt-6 form-container"
                      >
                        <input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`email-input px-4 py-2 text-zinc-800 bg-zinc-100 border rounded-md dark:bg-[#908b76] dark:text-zinc-100 ${
                            message && !isSuccess
                              ? "border-red-500"
                              : "border-zinc-300"
                          }`}
                        />
                        <button
                          type="submit"
                          className="subscribe-button flex items-center justify-center gap-2 px-6 py-2 text-white bg-[#846b31] rounded-md hover:bg-[#8e801ad0] transition-all ease-out"
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
                        <p
                          className={`mt-2 ${
                            isSuccess ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {message}
                        </p>
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
            <video src={cloudinaryUrl} autoPlay loop className="video" />
          </div>
        </div>
      </section>
      {showPopup && (
        <Popup
          message="Successfully subscribed!"
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
}
