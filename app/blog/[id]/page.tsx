"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import moment from "moment";
import Link from "next/link";
import { BsFillPencilFill, BsTrash } from "react-icons/bs";
import { deletePhoto } from "../../../actions/uploadActions";
import Comment from "../../../components/Comment";
import CommentForm from "../../../components/CommentForm";
import BlogContent from "../../../components/BlogContent";
import BlogActions from "../../../components/BlogActions";
import { splitParagraph } from "../../../components/splitParagraph";
import AuthorDetails from "../../../components/AuthorDetails";

interface BlogDetailsProps {
  params: {
    id: string;
  };
}

interface Comment {
  _id: string;
  text: string;
  user: {
    _id: string;
    name: string;
    avatar: {
      url: string;
    };
  };
}

interface Blog {
  content: string;
  _id: string;
  authorId: {
    _id: string;
    name: string;
    designation: string;
    avatar: {
      url: string;
    };
  };
  title: string;
  excerpt: string;
  category: string;
  createdAt: string;
  image: string;
  description: string;
  quote: string;
  likes: string[];
  comments: Comment[];
}

const BlogDetails: React.FC<BlogDetailsProps> = ({ params }) => {
  const [blogDetails, setBlogDetails] = useState<Blog>({
    _id: "",
    authorId: {
      _id: "",
      name: "",
      designation: "",
      avatar: {
        url: "",
      },
    },
    title: "",
    excerpt: "",
    category: "",
    createdAt: "",
    image: "",
    description: "",
    quote: "",
    content: "",
    likes: [],
    comments: [],
  });

  const [isDeleting, setIsDeleting] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [blogLikes, setBlogLikes] = useState(0);

  const [commentText, setCommentText] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [blogComments, setBlogComments] = useState(0);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/blog/${params.id}`
      );

      if (response.ok) {
        const blog: Blog = await response.json();
        setBlogDetails(blog);
        setIsLiked(blog?.likes?.includes(session?.user?._id || ""));
        setBlogLikes(blog?.likes?.length || 0);
        setBlogComments(blog?.comments?.length || 0);
      } else {
        console.error(`Failed to fetch blog: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  const timeStr = blogDetails?.createdAt;
  const time = moment(timeStr);
  const formattedTime = time.format("MMMM Do YYYY");

  const handleBlogDelete = async (imageId: string) => {
    try {
      const confirmModal = window.confirm(
        "Are you sure you want to delete your blog?"
      );

      if (confirmModal) {
        setIsDeleting(true);
        const response = await fetch(
          `http://localhost:3000/api/blog/${params.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${session?.user?.accessToken}`,
            },
          }
        );

        if (response?.status === 200) {
          await deletePhoto(imageId || ""); // Ensure imageId is a string or handle the case where it's undefined
          router.push("/blog");
        }
      }

      setIsDeleting(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    if (!session?.user) {
      alert("Please login before liking.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/blog/${params.id}/like`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(null),
        }
      );

      if (response.status === 200) {
        setIsLiked((prev) => !prev);
        setBlogLikes((prev) => (isLiked ? prev - 1 : prev + 1));
        setError(null);
      } else if (response.status === 400) {
        const errorData = await response.json();
        setError(errorData.message);
      } else {
        console.log("Request failed with status:", response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!commentText) {
      setError("Comment text is required.");
      return;
    }

    try {
      setIsCommenting(true);
      setError("");

      const newComment = {
        text: commentText,
      };

      const response = await fetch(
        `http://localhost:3000/api/blog/${params.id}/comment`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
          method: "POST",
          body: JSON.stringify(newComment),
        }
      );

      if (response?.status === 201) {
        setSuccess("Comment created successfully.");
        setTimeout(() => {
          setCommentText("");
          fetchBlog();
        }, 500);
      } else {
        setError("Error occurred while creating comment.");
      }
    } catch (error) {
      console.log(error);
      setError("Error occurred while creating comment.");
    }

    setIsCommenting(false);
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/blog/${params.id}/comment/${commentId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
          method: "DELETE",
        }
      );

      if (response?.status === 200) {
        fetchBlog();
      } else {
        console.log("Request failed with status: ", response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="container max-w-3xl pt-28">
      {session?.user.isAdmin && (
        <div className="flex items-center justify-end gap-5">
          <Link
            href={`/blog/edit/${params.id}`}
            className="flex items-center gap-1 text-primaryColor"
          >
            <BsFillPencilFill />
            Edit
          </Link>

          <button
            onClick={() => handleBlogDelete(blogDetails?.image || "")}
            className="flex items-center gap-1 text-red-500"
          >
            <BsTrash />
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      )}

      <AuthorDetails author={blogDetails.authorId} />

      <BlogContent
        blogDetails={blogDetails}
        formattedTime={formattedTime}
        splitParagraph={splitParagraph}
      />

      <BlogActions
        blogLikes={blogLikes}
        isLiked={isLiked}
        handleLike={handleLike}
        blogComments={blogComments}
        error={error}
      />

      <div>
        {!session?.user && (
          <h3 className="text-red-500">Kindly login to leave a comment.</h3>
        )}
        {session?.user && (
          <CommentForm
            commentText={commentText}
            setCommentText={setCommentText}
            handleCommentSubmit={handleCommentSubmit}
            isCommenting={isCommenting}
          />
        )}
        {blogDetails?.comments && blogDetails?.comments.length === 0 && (
          <p>No comments</p>
        )}
        {blogDetails?.comments && blogDetails?.comments.length > 0 && (
          <>
            {blogDetails.comments.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                sessionUserId={session?.user?._id ?? ""}
                handleDeleteComment={handleDeleteComment}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default BlogDetails;
