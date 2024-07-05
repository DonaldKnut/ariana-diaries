"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import moment from "moment";
import { MdArrowCircleLeft } from "react-icons/md";
import { TiWarning } from "react-icons/ti";

import {
  AiFillDelete,
  AiFillHeart,
  AiOutlineComment,
  AiOutlineHeart,
  AiTwotoneCalendar,
} from "react-icons/ai";
import { BsFillPencilFill, BsTrash } from "react-icons/bs";

import { deletePhoto } from "../../../actions/uploadActions";

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

  const splitParagraph = (paragraph: string): JSX.Element[] => {
    const MIN_LENGTH = 280;
    const sentences = paragraph.split(". ");

    let currentParagraph = "";
    let paragraphs: JSX.Element[] = [];

    for (let i = 0; i < sentences.length; i++) {
      const sentence = sentences[i];
      const isLastSentence = i === sentences.length - 1;

      if (isLastSentence) {
        currentParagraph += sentence + " "; // No dot after the last sentence
      } else if (currentParagraph.length + sentence.length + 2 <= MIN_LENGTH) {
        currentParagraph += sentence + ". ";
      } else {
        paragraphs.push(
          <p key={paragraphs.length}>{currentParagraph.trim()}</p>
        );
        currentParagraph = sentence + ". ";
      }
    }

    if (currentParagraph) {
      paragraphs.push(<p key={paragraphs.length}>{currentParagraph.trim()}</p>);
    }

    return paragraphs;
  };

  return (
    <section className="container max-w-3xl">
      {session?.user &&
        blogDetails?.authorId?._id.toString() ===
          session?.user?._id.toString() && (
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

      <div className="flex flex-col items-center justify-center">
        <Link href={`/user/${blogDetails?.authorId?._id.toString()}`}>
          <div className="flex flex-col justify-center items-center py-10">
            <Image
              src={
                blogDetails?.authorId?.avatar?.url
                  ? blogDetails?.authorId?.avatar?.url
                  : "/ariana-login-image.png"
              }
              alt="avatar image"
              width={0}
              height={0}
              sizes="100vw"
              className="w-20 h-20 rounded-full"
            />

            <div className="text-center">
              <p className="text-whiteColor">{blogDetails?.authorId?.name}</p>
              <p>{blogDetails?.authorId?.designation}</p>
            </div>
          </div>
        </Link>

        <div className="text-center space-y-3">
          <nav className="mb-4">
            <Link href="/blog" className="text-[#ffe83d] hover:underline">
              <MdArrowCircleLeft size={40} className="inline-block mr-2" />
              Back to Blog
            </Link>
          </nav>
          <h2 className="font-bold text-3xl">{blogDetails?.title}</h2>
          <p>{blogDetails?.excerpt}...</p>

          <p className="flex items-center justify-center gap-3">
            <span className="text-[#ffffff] bg-[#a5930a] rounded-[5px] p-2 ">
              {blogDetails?.category}
            </span>

            <span className="flex items-center gap-1">
              <AiTwotoneCalendar />
              {formattedTime}
            </span>
          </p>

          <div>
            <Image
              src={
                blogDetails?.image
                  ? blogDetails?.image
                  : "/ariana-login-image.png"
              }
              alt="blog details image"
              width={0}
              height={0}
              sizes="100vw"
              className="rounded-[23px] w-full h-full py-10"
            />
          </div>

          <div className="text-start">
            <div className="space-y-5">
              {blogDetails?.description &&
                splitParagraph(blogDetails?.description).map(
                  (paragraph, pIndex) => (
                    <div key={pIndex}>
                      {pIndex ===
                        Math.floor(
                          splitParagraph(blogDetails?.description).length / 2
                        ) && (
                        <blockquote className="border-l-4 border-[#a3984d] border-spacing-6 italic mb-5">
                          <p className="ml-5">{blogDetails?.quote}</p>
                        </blockquote>
                      )}

                      {paragraph}
                    </div>
                  )
                )}
              <p>{blogDetails?.content}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12">
        <div className="flex gap-10 items-center text-xl justify-center">
          <div className="flex items-center gap-1">
            <p>{blogLikes}</p>

            {isLiked ? (
              <AiFillHeart
                onClick={handleLike}
                size={20}
                color="#ed5784"
                cursor="pointer"
              />
            ) : (
              <AiOutlineHeart onClick={handleLike} size={20} cursor="pointer" />
            )}
          </div>

          <div className="flex items-center gap-1">
            <p>{blogComments}</p>

            <AiOutlineComment size={20} />
          </div>
        </div>
        {error && (
          <div className="flex justify-center items-center gap-2 mb-4 text-red-500 text-center">
            <TiWarning />
            <p>{error}</p>
          </div>
        )}
      </div>

      <div>
        {!session?.user && (
          <h3 className="text-red-500">Kindly login to leave a comment.</h3>
        )}

        {session?.user && (
          <form onSubmit={handleCommentSubmit} className="space-y-2">
            <input
              onChange={(e) => setCommentText(e.target.value)}
              value={commentText}
              name="comment"
              type="text"
              placeholder="Type message..."
              className="w-full px-3 py-2 rounded-lg shadow-sm border focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-[#4f4833] dark:text-white"
            />

            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-[#998304] rounded-lg shadow-sm hover:bg-[#9a8f54] transition duration-200"
              disabled={isCommenting}
            >
              {isCommenting ? "Loading..." : "Comment"}
            </button>
          </form>
        )}

        {blogDetails?.comments && blogDetails?.comments.length === 0 && (
          <p>No comments</p>
        )}

        {blogDetails?.comments && blogDetails?.comments.length > 0 && (
          <>
            {blogDetails.comments.map((comment) => (
              <div key={comment._id} className="flex gap-3 py-5 items-center">
                <Image
                  src={
                    comment?.user?.avatar?.url
                      ? comment?.user?.avatar?.url
                      : "/ariana-login-image.png"
                  }
                  alt="avatar image"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-10 h-10 rounded-full"
                />

                <div>
                  <p className="text-whiteColor">{comment?.user?.name}</p>
                  <p>{comment.text}</p>
                </div>

                {session?.user?._id === comment?.user?._id && (
                  <BsTrash
                    onClick={() => handleDeleteComment(comment._id)}
                    cursor="pointer"
                    className="text-red-500 ml-10"
                  />
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default BlogDetails;
