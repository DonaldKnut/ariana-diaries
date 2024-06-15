import BlogList from "../../components/blogs/blog-list";
import BlogSlider from "../../components/BlogSlider";

async function extractAllBlogs() {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/blog-post/get-all-posts`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const data = await res.json();

  if (data.success) return data.data;
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
