"use client";

import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";
import { IPost } from "../../../models/Post";
import CategoryList from "../../../components/category/index"; // Adjust the path as necessary
import { Blog } from "../../../utils/types"; // Ensure this import path is correct

const Page: React.FC = () => {
  const searchParams = useSearchParams();
  const categoryID = searchParams.get("id");
  const [posts, setPosts] = useState<Blog[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!categoryID) {
        setError("Category ID is required");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/api/category/${categoryID}`);
        const data: IPost[] = response.data.data;
        const blogs: Blog[] = data.map((post) => ({
          id: post._id.toString(), // Ensure this is a string
          title: post.title,
          description: post.description,
          category: post.category,
          userid: post.userId.toString(), // Ensure this is a string
          userImage: post.userImage,
          comments: post.comments.map((comment) => comment.toString()),
          image: post.image,
          content: post.content,
          author: post.author.toString(), // Ensure this is a string
        }));
        setPosts(blogs);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        setError("Error fetching blog posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [categoryID]);

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
