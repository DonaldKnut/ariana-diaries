import BlogList from "../../components/blogs/blog-list";
import BlogSlider from "../../components/BlogSlider";

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
    return []; // Return an empty array or handle the error as needed
  }
}

export default async function Blogs() {
  const blogPostsList = await extractAllBlogs();

  return (
    <>
      <div>
        <BlogSlider />
        <BlogList lists={blogPostsList} />
      </div>
    </>
  );
}
