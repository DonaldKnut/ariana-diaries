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
  handleDelete: (id: number) => void;
}) {
  const { image, category, title, content, userimage, userid, id } = blogItem;
  const { data: session } = useSession();

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
      <div className="relative">
        <Link href={`/blogs/${id}`}>
          <Image
            src={image}
            alt="Blog Post"
            className="w-full h-48 object-cover"
            width={400}
            height={200}
          />
          <span className="absolute top-4 right-4 bg-blue-500 text-white text-xs px-2 py-1 rounded">
            {category}
          </span>
        </Link>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          <Link href={`/blogs/${id}`} className="hover:underline">
            {title}
          </Link>
        </h3>
        <p className="mt-2 text-gray-600 dark:text-gray-300 line-clamp-3">
          {content}
        </p>
      </div>
      <div className="flex items-center p-4">
        <div className="flex items-center">
          <Image
            src={userimage}
            alt="Author"
            className="w-10 h-10 rounded-full"
            width={40}
            height={40}
          />
          <div className="ml-3">
            <p className="text-sm text-gray-700 dark:text-gray-300">By</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {userid.split("_")[0].toUpperCase()}
            </p>
          </div>
        </div>
        {session && session?.user?.name === userid && (
          <button
            onClick={() => handleDelete(id)}
            className="ml-auto text-red-600 hover:text-red-800"
          >
            <FaTrash />
          </button>
        )}
      </div>
    </div>
  );
}
