import React from "react";
import BlogList from "../../components/blogs/blog-list";
import BlogSlider from "../../components/BlogSlider";
import FirstBlog from "../../components/FirstBlog";
import Offer from "../../components/Offer";

async function extractAllBlogs() {
  const url = `${process.env.NEXTAUTH_URL}/api/blog-post/get-all-posts`;
  console.log("Fetching blogs from:", url); // Log the URL

  try {
    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch blog posts: ${res.statusText}`);
    }

    const data = await res.json();

    if (data.success) return data.data;
    else throw new Error(data.message || "Unknown error occurred");
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export default async function Blogs() {
  const blogPostsList = await extractAllBlogs();

  const firstBlog = blogPostsList.length > 0 ? blogPostsList[0] : null;
  const otherBlogs = blogPostsList.length > 1 ? blogPostsList.slice(1) : [];

  return (
    <div>
      <BlogSlider />
      <div>
        <h2 className="text-left ml-7 font-bold text-[53px] my-10">
          <span className="text-primaryColor">Trending</span> Blog
        </h2>
      </div>
      {firstBlog && <FirstBlog firstBlog={firstBlog} />}
      <BlogList lists={otherBlogs} />
      <div className="bg-[#afaa7d] p-11">
        <div className="w-[80%] ml-auto mr-auto mb-8">
          <Offer />
        </div>
      </div>
    </div>
  );
}
