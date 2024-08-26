import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdArrowCircleLeft } from "react-icons/md";
import { AiTwotoneCalendar } from "react-icons/ai";

interface BlogContentProps {
  blogDetails: {
    title: string;
    excerpt: string;
    category: string;
    createdAt: string;
    image: string;
    description: string;
    quote: string;
    content: string;
  };
  formattedTime: string;
  splitParagraph: (paragraph: string) => JSX.Element[];
}

const BlogContent: React.FC<BlogContentProps> = ({
  blogDetails,
  formattedTime,
  splitParagraph,
}) => {
  if (!blogDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-center space-y-3">
        <nav className="mb-4">
          <Link href="/blog" className="text-[#949019] hover:underline">
            <MdArrowCircleLeft size={40} className="inline-block mr-2" />
            Back to Blog
          </Link>
        </nav>
        <h2 className="font-bold text-3xl">{blogDetails?.title}</h2>
        <p>{blogDetails?.excerpt}</p>
        <p className="flex items-center justify-center gap-3">
          {/* <Link href={`/category?category=${blogDetails?.category}`}> */}
          <span className="text-[#ffffff] bg-[#a5930a] rounded-[5px] p-2">
            {blogDetails?.category}
          </span>
          {/* </Link> */}

          <span className="flex items-center gap-1">
            <AiTwotoneCalendar />
            {formattedTime}
          </span>
        </p>
        <div>
          <Image
            src={
              blogDetails?.image
                ? blogDetails?.image
                : "/ariana-login-image.png"
            }
            alt="blog details image"
            width={0}
            height={0}
            sizes="100vw"
            className="rounded-[23px] w-full h-full py-10"
          />
        </div>
        <div className="text-start">
          <div className="space-y-5">
            {blogDetails?.description &&
              splitParagraph(blogDetails?.description).map(
                (paragraph, pIndex) => (
                  <div key={pIndex}>
                    {pIndex ===
                      Math.floor(
                        splitParagraph(blogDetails?.description).length / 2
                      ) && (
                      <blockquote className="border-l-4 border-[#a3984d] border-spacing-6 italic mb-5">
                        <p className="ml-5">{blogDetails?.quote}</p>
                      </blockquote>
                    )}
                    {paragraph}
                  </div>
                )
              )}
            <p>{blogDetails?.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogContent;
