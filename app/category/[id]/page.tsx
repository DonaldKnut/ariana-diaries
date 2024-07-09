"use client";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { IPost } from "../../../models/Post";

interface CategoryPageProps {
  posts: IPost[];
}

const CategoryPage: React.FC<CategoryPageProps> = ({ posts }) => {
  const searchParams = useSearchParams();
  const categoryID = searchParams.get("categoryID"); // Get the categoryID from the query params

  if (!posts.length) {
    return <p>No posts available for this category.</p>;
  }

  return (
    <div>
      <h1>Posts for Category: {categoryID ?? "Unknown"}</h1>
      {posts.map((post: IPost) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </div>
      ))}
    </div>
  );
};

export default async function Page() {
  const searchParams = useSearchParams();
  const categoryID = searchParams.get("categoryID");

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blog-posts/${categoryID}`
    );

    return <CategoryPage posts={response.data.data} />;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return <CategoryPage posts={[]} />;
  }
}
