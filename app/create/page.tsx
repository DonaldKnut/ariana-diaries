"use client";
import React, { useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Spinner from "../../components/Spinner";
import { GoPlusCircle } from "react-icons/go";
import Button from "../../components/button";
import { GlobalContext } from "../../context";
import { MdError } from "react-icons/md";
import Tiptap from "../../components/Tiptap";
import { BiLike } from "react-icons/bi";

import Image from "next/image";
import { formControls, initialBlogFormData } from "../../utils";
import { BlogFormData } from "../../utils/types";

const Create = () => {
  const { formData, setFormData } = useContext(GlobalContext);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [state, setState] = useState(initialBlogFormData);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const CLOUD_NAME = "dtujpq8po";
  const UPLOAD_PRESET = "ariana_diaries";

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

  const handleBlogImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;
    setImageLoading(true);
    const file = event.target.files[0];

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const image = await uploadImage(formData);

      if (image) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          image: image.url,
        }));
        setState((prevState) => ({ ...prevState, image: image.url }));
      } else {
        setError("Error uploading image");
      }
    } catch (error: any) {
      setError("Error uploading image: " + error.message);
    } finally {
      setImageLoading(false);
    }
  };

  const uploadImage = async (formData: FormData) => {
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error.message);
      }

      const data = await res.json();
      const image = {
        id: data["public_id"],
        url: data["secure_url"],
      };

      return image;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

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

    // Validate required fields
    if (
      !title ||
      !description ||
      !image || // Ensure image is validated
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
        image, // Include image in the request body
        category,
        excerpt,
        quote,
        content,
        userid,
        userimage: userimage || "",
        author: userid,
      };

      // Log data before sending the request
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
                Create Your Own Blog Post
              </h2>
              <div>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <div className={imageLoading ? "w-1/2" : "w-full"}>
                      <label className="mb-3 block text-sm font-medium text-dark text-[#8c7b25] ">
                        Upload Blog Image
                      </label>
                      <input
                        id="fileinput"
                        accept="image/*"
                        max={1000000}
                        onChange={handleBlogImageChange}
                        type="file"
                        className="w-full bg-[#6f5e28] mb-8 rounded-md border border-transparent py-3 px-6 text-base text-white placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:shadow-signUp"
                      />
                      {state.image && (
                        <Image
                          src={state.image}
                          priority
                          alt="Sample image"
                          width={0}
                          height={0}
                          sizes="100vw"
                          className="w-32 mt-5"
                        />
                      )}
                    </div>
                    {imageLoading && (
                      <div className="w-1/2">
                        <Spinner />
                      </div>
                    )}
                  </div>
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
      </div>
    </section>
  );
};

export default Create;
