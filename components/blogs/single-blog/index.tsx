"use client";
import { Blog } from "../../../utils/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";

export default function SingleBlog({
  blogItem,
  handleDelete,
}: {
  blogItem: Blog;
  handleDelete: (id: string, userid: string) => void;
}) {
  const { image, category, title, content, userImage, userid, id, author } =
    blogItem;
  const { data: session } = useSession();

  const stripHtmlTags = (html: string) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const userEmail = session?.user?.email ?? "";

  return (
    <div className="bg-white dark:bg-[#5e511b] shadow-lg rounded-lg overflow-hidden h-[460px] w-[300px] flex flex-col justify-between">
      <div className="relative">
        <Link href={`/blogs/${id}`}>
          <Image
            src={
              image ||
              `https://eu.ui-avatars.com/api/?name=${userEmail
                .charAt(0)
                .toUpperCase()}`
            }
            alt="Blog Post"
            className="w-full h-48 object-cover"
            width={400}
            height={200}
          />
          <span className="absolute top-4 right-4 bg-[#857936] text-white text-xs px-2 py-1 rounded">
            {category}
          </span>
        </Link>
      </div>
      <div className="p-4 flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          <Link href={`/blogs/${id}`} className="hover:underline">
            {truncateText(title, 50)}
          </Link>
        </h3>
        <p className="mt-2 text-gray-600 dark:text-gray-300 line-clamp-3">
          {truncateText(stripHtmlTags(content), 100)}
        </p>
      </div>
      <div className="flex items-center p-4">
        <div className="flex items-center">
          {userImage ? (
            <Image
              src={userImage}
              alt="Author"
              className="w-10 h-10 rounded-full"
              width={40}
              height={40}
            />
          ) : (
            <div className="w-10 h-10 flex items-center justify-center bg-gray-300 dark:bg-[#b3a786] rounded-full text-white font-bold">
              {userEmail.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="ml-3 flex gap-2 items-center justify-center">
            <p className="text-sm text-gray-700 dark:text-gray-300">By</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {author}
            </p>
          </div>
        </div>
        {session && session.user.email === userEmail && id !== undefined && (
          <button
            onClick={() => handleDelete(id.toString(), userid)}
            className="ml-auto text-red-600 hover:text-red-800"
          >
            <FaTrash />
          </button>
        )}
      </div>
    </div>
  );
}
