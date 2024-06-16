"use client";

import React, { useContext, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { initializeApp } from "firebase/app";
import Spinner from "../../components/Spinner";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { GoPlusCircle } from "react-icons/go";
import Button from "../../components/button";
import { GlobalContext } from "../../context";
import Tiptap from "../../components/Tiptap";
import { firebaseConfig, formControls } from "../../utils";
import { BlogFormData } from "../../utils/types";

const initialBlogFormData: BlogFormData = {
  title: "",
  description: "",
  image: "",
  category: "",
  content: "",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, "gs://ariana-blog.appspot.com");

function createUniqueFileName(fileName: string) {
  const timeStamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 12);
  return `${fileName}-${timeStamp}-${randomString}`;
}

async function handleImageSaveToFirebase(file: any) {
  const uniqueFileName = createUniqueFileName(file?.name);
  const storageRef = ref(storage, `blog/${uniqueFileName}`);
  const uploadImg = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadImg.on(
      "state_changed",
      (snapshot) => {},
      (error) => reject(error),
      () => {
        getDownloadURL(uploadImg.snapshot.ref)
          .then((url) => resolve(url))
          .catch((error) => reject(error));
      }
    );
  });
}

export default function Create() {
  const { formData, setFormData } = useContext(GlobalContext);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleBlogImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;
    setImageLoading(true);
    try {
      const imageUrl: any = await handleImageSaveToFirebase(
        event.target.files[0]
      );
      setImageLoading(false);
      setFormData({
        ...formData,
        image: imageUrl,
      });
    } catch (error) {
      setImageLoading(false);
      console.error("Error uploading image:", error);
    }
  };

  const handleSaveBlogPost = async () => {
    if (
      !formData.title ||
      !formData.image ||
      !formData.category ||
      !formData.content
    ) {
      alert("Title, Image, Category, and Content fields are required");
      return;
    }

    const formDataToSend = {
      ...formData,
      userid: session?.user?.name,
      userimage: session?.user?.image,
      comments: [],
    };

    console.log("Sending form data:", formDataToSend);

    const res = await fetch("/api/blog-post/add-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataToSend),
    });

    const data = await res.json();
    console.log("Response from server:", data);
    if (data && data.success) {
      setFormData(initialBlogFormData);
      router.push("/blogs");
    } else {
      console.error(data.message);
    }
  };

  return (
    <section className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mb-12 rounded-md bg-primary/[3%] py-10 dark:bg-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px] px-8">
              <h2 className="mb-3 text-2xl font-bold text-[#6d5e16] sm:text-3xl lg:text-2xl xl:text-3xl">
                Create Your Own Blog Post
              </h2>
              <div>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <div className={`${imageLoading ? "w-1/2" : "w-full"}`}>
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
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setFormData({
                                ...formData,
                                [control.id]: event.target.value,
                              });
                            }}
                            value={formData[control.id as keyof BlogFormData]}
                            className="w-full mb-8 rounded-md border border-transparent py-3 px-6 text-base text-[#d1bc60] placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#6f5e28d7] dark:shadow-signUp"
                          />
                        ) : control.component === "select" ? (
                          <select
                            name={control.id}
                            placeholder={control.placeholder}
                            onChange={(
                              event: React.ChangeEvent<HTMLSelectElement>
                            ) => {
                              setFormData({
                                ...formData,
                                [control.id]: event.target.value,
                              });
                            }}
                            value={formData[control.id as keyof BlogFormData]}
                            className="w-full mb-8 rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#88764b] dark:shadow-signUp"
                          >
                            <option value={""}>Select</option>
                            {control.options.map((optionItem) => (
                              <option
                                key={optionItem.value}
                                value={optionItem.value}
                              >
                                {optionItem.label}
                              </option>
                            ))}
                          </select>
                        ) : null}
                      </div>
                    ))}
                    <div className="w-full px-4">
                      <label className="mb-3 block text-sm font-medium text-dark dark:text-white">
                        Blog Content
                      </label>
                      <Tiptap
                        content={formData.content}
                        onChange={(content) => {
                          setFormData({
                            ...formData,
                            content,
                          });
                        }}
                      />
                    </div>
                    <div className="w-full px-4">
                      <Button
                        text="Create New Blog"
                        onClick={handleSaveBlogPost}
                        icon={<GoPlusCircle />}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
