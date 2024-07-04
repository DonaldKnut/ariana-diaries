"use client";
import { Blog } from "../../../utils/types";
import SingleBlog from "../single-blog";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "./index.css";

export default function BlogList({ lists }: { lists: Blog[] }) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  const handleDelete = async (id: string, userid: string) => {
    console.log(id, userid);

    try {
      const res = await fetch(
        `/api/blog-post/delete-post?id=${id}&userid=${userid}`,
        {
          method: "DELETE",
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete the post.");
      }

      const data = await res.json();

      if (data && data.success) {
        router.refresh();
      } else {
        throw new Error("Deletion was not successful.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <section className="pt-[120px] pb-[120px]">
      <div className="container mx-auto px-4">
        {lists && lists.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {lists.map((listItem: Blog) => (
              <div key={listItem.id}>
                <SingleBlog handleDelete={handleDelete} blogItem={listItem} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/aiana_image.png"
              alt="No blogs yet"
              className="w-69 h-64 mb-4"
              width="340"
              height="340"
            />
            <p className="text-xl text-gray-500">No blogs yet</p>
          </div>
        )}
      </div>
    </section>
  );
}
