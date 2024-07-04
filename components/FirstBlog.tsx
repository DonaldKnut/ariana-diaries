"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IoCalendarClearSharp } from "react-icons/io5";
import moment from "moment";

interface Blog {
  _id: string;
  image?: string;
  category: string;
  createdAt: string;
  title: string;
  excerpt: string;
  authorId?: string;
}

interface FirstBlogProps {
  firstBlog: Blog;
}

const FirstBlog: React.FC<FirstBlogProps> = ({ firstBlog }) => {
  console.log("First Blog Image URL:", firstBlog?.image); // Log the image URL
  const timeStr = firstBlog?.createdAt;
  const time = moment(timeStr);
  const formattedTime = time.format("MMMM Do YYYY");

  return (
    <section>
      <Link href={`/blog/${firstBlog?._id}`}>
        <div className="flex p-11 flex-col mb-12 bg-[#d4cf9f] text-[#615f0a] text-[28px] md:flex-row items-center gap-8 ml-9 mr-9 rounded-[13px] hover:border-gray-500 hover:bg-[#9a9053] hover:text-white transition ease-in-out">
          <div className="w-full lg:w-2/5">
            <Image
              src={
                firstBlog?.image ? firstBlog.image : "/ariana-login-image.png"
              }
              alt="first blog image"
              width={180}
              height={180}
              sizes="100vw"
              className="w-full h-full rounded-lg"
            />
          </div>

          <div className="w-full lg:w-3/5 space-y-5">
            <div className="flex items-center gap-3 text-xs">
              <p className="text-[#f4f42c] bg-[#967929] p-3 rounded-[12px] font-bold text-[19px]">
                {firstBlog?.category}
              </p>

              <p className="flex items-center gap-1 text-paragraphColor text-[15px]">
                <IoCalendarClearSharp />
                {formattedTime}
              </p>
            </div>

            <div className="space-y-2">
              <h2>{firstBlog?.title}</h2>
              <p className="text-sm text-paragraphColor">
                {firstBlog?.excerpt}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Image
                src={
                  firstBlog?.authorId
                    ? firstBlog?.authorId
                    : "/ariana-login-image.png"
                }
                alt="picture of the author"
                width={0}
                height={0}
                sizes="100vw"
                className="w-10 h-10 rounded-full"
              />

              <div className="text-xs">
                <h6>{firstBlog?.authorId}</h6>
                <p className="text-paragraphColor">{firstBlog?.authorId}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default FirstBlog;
