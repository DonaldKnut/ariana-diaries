"use client";
import React, { useState } from "react";
import Image from "next/image";
import Spinner from "./Spinner";

const CLOUD_NAME = "dyib6rska";
const UPLOAD_PRESET = "ariana_diaries";

const ImageUpload = ({
  setFormData,
  state,
  setState,
  label = "Upload Image",
  placeholder = "Upload Blog Image",
}: any) => {
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  const handleImageChange = async (
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
        setFormData((prevFormData: any) => ({
          ...prevFormData,
          image: image.url,
        }));
        setState((prevState: any) => ({ ...prevState, image: image.url }));
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

  return (
    <div className="flex gap-3">
      <div className={imageLoading ? "w-1/2" : "w-full"}>
        <label
          htmlFor="fileinput"
          className="mb-3 block text-sm font-medium text-dark text-[#8c7b25]"
        >
          {placeholder}
        </label>
        <input
          id="fileinput"
          accept="image/*"
          max={1000000}
          onChange={handleImageChange}
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
  );
};

export default ImageUpload;
