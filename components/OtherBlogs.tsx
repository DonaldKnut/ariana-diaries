"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AiTwotoneCalendar } from "react-icons/ai";
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

interface OtherBlogsProps {
  otherBlogs: Blog[];
}

const OtherBlogs: React.FC<OtherBlogsProps> = ({ otherBlogs }) => {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {otherBlogs.map((item, index) => {
          const formattedTime = moment(item.createdAt).format("MMMM Do YYYY");

          return (
            <div
              key={index}
              className="border border-transparent bg-[#96832d] p-4 rounded-[14px] text-[#f5efc5] hover:text-[#fff98e] transition-all ease-out"
            >
              <Link href={`/blog/${item?._id}`}>
                <div>
                  <Image
                    src={
                      item?.image?.url
                        ? item.image.url
                        : "/ariana-login-image.png"
                    }
                    alt="blog image"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-full rounded-lg mb-2"
                  />
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs">
                      <p className="text-white bg-[#49410c] p-2 rounded-[5px]">
                        {item.category}
                      </p>
                      <p className="flex items-center gap-1 text-paragraphColor">
                        <AiTwotoneCalendar />
                        {formattedTime}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h2>{item.title}</h2>
                      <p className="text-sm text-paragraphColor">
                        {item.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Image
                        src={
                          item.authorId?.avatar?.url
                            ? item.authorId.avatar.url
                            : "/ariana-login-image.png"
                        }
                        alt="picture of the author"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="text-xs">
                        <h6>{item.authorId?.name}</h6>
                        <p className="text-paragraphColor">
                          {item.authorId?.designation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default OtherBlogs;
