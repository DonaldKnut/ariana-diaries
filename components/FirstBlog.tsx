// /components/FirstBlog.tsx

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IoCalendarClearSharp } from "react-icons/io5";
import moment from "moment";

interface Author {
  avatar?: {
    url: string;
  };
  name: string;
  designation: string;
}

interface Blog {
  _id: string;
  image?: {
    url: string;
  };
  category: string;
  createdAt: string;
  title: string;
  excerpt: string;
  authorId?: Author;
}

interface FirstBlogProps {
  firstBlog: Blog;
}

const FirstBlog: React.FC<FirstBlogProps> = ({ firstBlog }) => {
  const timeStr = firstBlog?.createdAt;
  const time = moment(timeStr);
  const formattedTime = time.format("MMMM Do YYYY");

  return (
    <section className="p-4">
      <Link href={`/blog/${firstBlog?._id}`}>
        <div className="flex flex-col md:flex-row items-center gap-8 p-6 mb-12 bg-[#d4cf9f] text-[#615f0a] text-[20px] md:text-[28px] rounded-[13px] transition ease-in-out hover:border-gray-500 hover:bg-[#9a9053] hover:text-white">
          <div className="w-full md:w-2/5">
            <Image
              src={
                firstBlog?.image?.url
                  ? firstBlog.image.url
                  : "/ariana-login-image.png"
              }
              alt="first blog image"
              width={500}
              height={300}
              sizes="100vw"
              className="w-full h-auto rounded-lg"
            />
          </div>

          <div className="w-full md:w-3/5 space-y-5">
            <div className="flex flex-col md:flex-row items-center gap-3 text-xs">
              <Link href={`/category/${firstBlog?.category}`}>
                <p className="text-[#f4f42c] bg-[#967929] p-2 md:p-3 rounded-[12px] font-bold text-[16px] md:text-[19px]">
                  {firstBlog?.category}
                </p>
              </Link>

              <p className="flex items-center gap-1 text-paragraphColor text-[13px] md:text-[15px]">
                <IoCalendarClearSharp />
                {formattedTime}
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-semibold">
                {firstBlog?.title}
              </h2>
              <p className="text-sm md:text-base text-paragraphColor">
                {firstBlog?.excerpt}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Image
                src="https://res.cloudinary.com/dqrbn3bif/image/upload/v1724336611/f2brifbjc8nxss1bxsok.png"
                alt="picture of the author"
                width={70}
                height={70}
                sizes="100vw"
                className="w-10 h-10 rounded-full"
              />

              <div className="text-xs md:text-sm">
                <h4>Ariana Oluwole</h4>
                <p className="text-paragraphColor">CEO of Ariana Diaries</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default FirstBlog;
