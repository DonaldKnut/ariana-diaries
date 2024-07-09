"use client";
import React, { useState } from "react";
import Container from "../../components/Container";
import Image from "next/image";
import { MdOutlineArrowCircleRight } from "react-icons/md";
import { FaInstagram, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { IoCheckmarkCircleSharp, IoCloseCircleSharp } from "react-icons/io5";
import { FaSpinner } from "react-icons/fa"; // Import the spinner icon

const AboutPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the request starts

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setMessage(
          "Subscription successful! Check your email for confirmation."
        );
      } else {
        setIsSuccess(false);
        setMessage("Failed to subscribe. Please try again.");
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Set loading to false when the request completes
    }
  };

  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src="/ariana_about_image.jpeg"
              alt="Ariana Oluwole"
              sizes="(min-width: 1024px) 32rem, 20rem"
              height={430}
              width={430}
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Ariana Oluwole - Young Entrepreneur and Educational Pioneer
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              Ariana Oluwole is an entrepreneur making waves in the educational
              sector of Sierra Leone. As the Owner and Proprietress of Narnia
              Educational Group, she has established an educational consultancy
              and an early learning center catering to children aged 0-3 years.
              Narnia Educational Group, founded by Oluwole, aims to prepare
              young minds during one of the most critical learning stages. The
              center focuses on holistic education as a tool for nation-building
              and development. Oluwole's passion for education has led her to
              become a certified trainer, facilitator, and public speaker. She
              believes in the power of education to transform lives. Narnia
              prepares young minds during one of the most critical learning
              periods of their lives.
            </p>
            <p>
              Ariana's passion for early childhood education led her to
              establish Narnia, where she combines her expertise with innovative
              teaching methods to create a nurturing environment for young
              learners. Her dedication to education and entrepreneurship has
              made a significant impact on the community.
            </p>
            <p>
              With a background in educational consultancy, Ariana continuously
              strives to enhance the quality of early education by offering
              personalized and effective learning solutions. Her vision is to
              inspire and empower the next generation through comprehensive
              early childhood education.
            </p>
            <p>Connect with Ariana on social media:</p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/ariana_oluwole"
                className="text-[#655e13] hover:text-[#b6a91e] dark:text-[#ab8919] dark:hover:text-[#938519] transition-transform transform hover:scale-110"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/ariana-oluwole-17a78597"
                className="text-[#655e13] hover:text-[#b6a91e] dark:text-[#ab8919] dark:hover:text-[#938519] transition-transform transform hover:scale-110"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://twitter.com/ariana_oluwole"
                className="text-[#655e13] hover:text-[#b6a91e] dark:text-[#ab8919] dark:hover:text-[#938519] transition-transform transform hover:scale-110"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="mailto:ariana@narniaedu.com"
                className="text-[#655e13] hover:text-[#b6a91e] dark:text-[#ab8919] dark:hover:text-[#938519] transition-transform transform hover:scale-110"
              >
                <FaEnvelope size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
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
            className={`mt-4 flex items-center gap-2 px-4 py-2 border rounded-md ${
              isSuccess
                ? "border-green-500 text-green-500"
                : "border-red-500 text-red-500"
            }`}
          >
            {isSuccess ? (
              <IoCheckmarkCircleSharp size={24} />
            ) : (
              <IoCloseCircleSharp size={24} />
            )}
            <p>{message}</p>
          </div>
        )}
      </div>
    </Container>
  );
};

export default AboutPage;
