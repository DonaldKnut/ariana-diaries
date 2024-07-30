"use client";

import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";
import CategoryList from "../../../components/category/index"; // Adjust the path as necessary
import { Blog } from "../../../utils/types"; // Ensure this import path is correct

const Page: React.FC = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category"); // Extract the category from the URL
  const [posts, setPosts] = useState<Blog[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Search Params:", searchParams.toString()); // Debugging log
    console.log("Category:", category); // Debugging log

    const fetchPosts = async () => {
      if (!category) {
        setError("Category is required");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/api/category/${category}`);
        console.log("Response data:", response.data); // Debugging log
        const data: Blog[] = response.data.data;
        setPosts(data);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        setError("Error fetching blog posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [category]);

  if (loading) {
    return (
      <p className="flex items-center justify-center min-h-screen">
        Loading...
      </p>
    );
  }

  if (error) {
    return (
      <p className="flex items-center justify-center min-h-screen">{error}</p>
    );
  }

  return <CategoryList list={posts} />;
};

export default Page;
