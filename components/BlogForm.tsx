"use client";
import React, { useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GoPlusCircle } from "react-icons/go";
import { MdError } from "react-icons/md";
import { BiLike } from "react-icons/bi";
import Image from "next/image";
import { GlobalContext } from "../context";
import { formControls, initialBlogFormData } from "../utils";
import { BlogFormData } from "../utils/types";
import ImageUpload from "./ImageUpload";
import Tiptap from "./Tiptap";
import Button from "../components/button/index";
import Spinner from "./Spinner";

const BlogForm = () => {
  const { formData, setFormData } = useContext(GlobalContext);
  const [state, setState] = useState(initialBlogFormData);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      setFormData((prevFormData: BlogFormData) => ({
        ...prevFormData,
        userid: session.user.name || "", // Ensure a default value or handle null/undefined
        userimage: session.user.image || "", // Ensure a default value or handle null/undefined
      }));
    }
  }, [session]);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setError("");
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const handleSaveBlogPost = async () => {
    const { title, description, image, category, excerpt, quote, content } =
      state;
    const userid = session?.user?.name;
    const userimage = session?.user?.image;

    if (
      !title ||
      !description ||
      !image ||
      !category ||
      !excerpt ||
      !quote ||
      !content ||
      !userid
    ) {
      setError("Please fill out all required fields.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      setSuccess("");

      const newBlog = {
        title,
        description,
        image,
        category,
        excerpt,
        quote,
        content,
        userid,
        userimage: userimage || "",
        author: userid,
      };

      console.log("New blog post data:", newBlog);

      const res = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        body: JSON.stringify(newBlog),
      });

      const data = await res.json();
      if (data && data.success) {
        setSuccess("Blog created successfully.");
        setTimeout(() => {
          setFormData(initialBlogFormData);
          router.push("/blog");
        }, 1500);
      } else {
        console.error(data.message);
        setError("Error occurred while creating blog.");
      }
    } catch (error) {
      console.error("Error occurred while creating blog:", error);
      setError("Error occurred while creating blog.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mb-12 rounded-md bg-primary/[3%] py-10 dark:bg-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px] px-8">
              <h2 className="flex items-center gap-3 mb-3 text-2xl font-bold text-[#6d5e16] sm:text-3xl lg:text-2xl xl:text-3xl">
                <Image
                  src="/create.png"
                  alt="create icon"
                  width={90}
                  height={90}
                />
                Create a Blog Post
              </h2>
              <div>
                <ImageUpload
                  setFormData={setFormData}
                  state={state}
                  setState={setState}
                />
                <div className="-mx-4 flex flex-wrap">
                  {formControls.map((control, key) => (
                    <div className="w-full px-4" key={key}>
                      <label className="mb-3 block text-sm font-medium text-dark dark:text-white">
                        {control.label}
                      </label>
                      {control.component === "input" ? (
                        <input
                          type={control.type}
                          name={control.id}
                          placeholder={control.placeholder}
                          onChange={(event) => {
                            setFormData({
                              ...formData,
                              [control.id]: event.target.value,
                            });
                            handleChange(event);
                          }}
                          value={formData[control.id as keyof BlogFormData]}
                          className="w-full mb-8 rounded-md border border-transparent py-3 px-6 text-base text-[#d1bc60] placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#6f5e28d7] dark:shadow-signUp"
                        />
                      ) : control.component === "textarea" ? (
                        <textarea
                          rows={2}
                          name={control.id}
                          placeholder={control.placeholder}
                          onChange={(event) => {
                            setFormData({
                              ...formData,
                              [control.id]: event.target.value,
                            });
                            handleChange(event);
                          }}
                          value={formData[control.id as keyof BlogFormData]}
                          className="w-full mb-8 rounded-md border border-transparent py-3 px-6 text-base text-[#d1bc60] placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#6f5e28d7] dark:shadow-signUp"
                        />
                      ) : (
                        <select
                          name={control.id}
                          onChange={(event) => {
                            setFormData({
                              ...formData,
                              [control.id]: event.target.value,
                            });
                            handleChange(event);
                          }}
                          value={formData[control.id as keyof BlogFormData]}
                          className="w-full mb-8 rounded-md border border-transparent py-3 px-6 text-base text-[#d1bc60] placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#6f5e28d7] dark:shadow-signUp"
                        >
                          {control.options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mb-3">
                  <label className="mb-3 block text-sm font-medium text-dark dark:text-white">
                    Write Your Content (Required)
                  </label>
                  <Tiptap
                    content={formData.description}
                    onChange={(content: string) =>
                      setFormData({ ...formData, description: content })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="mb-3 block text-sm font-medium text-dark dark:text-white">
                    Excerpt (Required)
                  </label>
                  <textarea
                    rows={2}
                    name="excerpt"
                    placeholder="Enter the blog excerpt"
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        excerpt: event.target.value,
                      });
                      handleChange(event);
                    }}
                    value={formData.excerpt}
                    className="w-full mb-8 rounded-md border border-transparent py-3 px-6 text-base text-[#d1bc60] placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#6f5e28d7] dark:shadow-signUp"
                  />
                </div>
                <div className="mb-3">
                  <label className="mb-3 block text-sm font-medium text-dark dark:text-white">
                    Quote
                  </label>
                  <textarea
                    rows={2}
                    name="quote"
                    placeholder="Enter a quote"
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        quote: event.target.value,
                      });
                      handleChange(event);
                    }}
                    value={formData.quote}
                    className="w-full mb-8 rounded-md border border-transparent py-3 px-6 text-base text-[#d1bc60] placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#6f5e28d7] dark:shadow-signUp"
                  />
                </div>
                <div className="mb-3">
                  <label className="mb-3 block text-sm font-medium text-dark dark:text-white">
                    Additional Information about Blog
                  </label>
                  <textarea
                    rows={5}
                    name="content"
                    placeholder="Enter the blog additional Information"
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        content: event.target.value,
                      });
                      handleChange(event);
                    }}
                    value={formData.content}
                    className="w-full mb-8 rounded-md border border-transparent py-3 px-6 text-base text-[#d1bc60] placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#6f5e28d7] dark:shadow-signUp"
                  />
                </div>
                {error && (
                  <div className="flex items-center gap-3 mb-4 rounded-md bg-red-500 py-2 px-4 text-white">
                    <MdError /> {error}
                  </div>
                )}
                {success && (
                  <div className="flex items-center gap-3 mb-4 rounded-md bg-green-500 py-2 px-4 text-white">
                    <BiLike /> {success}
                  </div>
                )}
                <div className="flex justify-end">
                  <Button
                    icon={<GoPlusCircle />}
                    text="Create New Blog"
                    onClick={handleSaveBlogPost}
                    disabled={isLoading}
                    className="bg-[#6d5e16] hover:bg-opacity-90 text-white"
                  >
                    {isLoading ? <Spinner /> : "Save Blog Post"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogForm;
