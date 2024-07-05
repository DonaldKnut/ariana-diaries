"use client";
import React, { useEffect, useState } from "react";
import FirstBlog from "../../components/FirstBlog";
import OtherBlogs from "../../components/OtherBlogs";
import BlogSlider from "../../components/BlogSlider";
import Offer from "../../components/Offer";

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

async function fetchBlogs(): Promise<Blog[]> {
  const res = await fetch("http://localhost:3000/api/blog", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const result = await res.json();
  console.log("API Response:", result);

  // Adjust this based on your actual API response structure
  if (result.success) {
    return result.data;
  } else {
    throw new Error("Failed to fetch blogs");
  }
}

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const data = await fetchBlogs();
        console.log("Fetched blogs:", data); // Log the fetched blogs
        setBlogs(data);
      } catch (error: any) {
        console.error("Error fetching blogs:", error); // Log the error
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Error: {error}
      </div>
    );
  }

  console.log("Blogs state:", blogs); // Log the blogs state

  const firstBlog = blogs && blogs[0];
  const otherBlogs = blogs.length > 0 ? blogs.slice(1) : [];

  return (
    <div>
      {blogs.length > 0 ? (
        <div className="container">
          <h2 className="text-left ml-7 font-bold text-[53px] my-10 mt-24">
            <span className="text-primaryColor">Trending</span> Blog
          </h2>
          <FirstBlog firstBlog={firstBlog} />
          <BlogSlider />
          <div className="mt-4 mb-4">
            <OtherBlogs otherBlogs={otherBlogs} />
          </div>
          <div className="bg-[#afaa7d] p-11 rounded-[23px] mt-5 mb-8">
            <div className="w-[80%] ml-auto mr-auto mb-8">
              <Offer />
            </div>
          </div>
        </div>
      ) : (
        <h3 className="flex items-center justify-center min-h-screen">
          No Blogs...
        </h3>
      )}
    </div>
  );
};

export default Blog;
