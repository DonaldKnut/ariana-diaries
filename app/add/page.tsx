"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BsCloudUploadFill } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";

type Inputs = {
  title: string;
  desc: string;
  price: number;
  catSlug: string;
};

type Option = {
  title: string;
  additionalPrice: number;
};

const AddPage = () => {
  const { data: session, status } = useSession();
  const [inputs, setInputs] = useState<Inputs>({
    title: "",
    desc: "",
    price: 0,
    catSlug: "",
  });

  const [option, setOption] = useState<Option>({
    title: "",
    additionalPrice: 0,
  });

  const [options, setOptions] = useState<Option[]>([]);
  const [file, setFile] = useState<File>();

  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated" || !session?.user?.isAdmin) {
    router.push("/");
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const changeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOption((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const item = (target.files as FileList)[0];
    setFile(item);
  };

  const upload = async () => {
    const data = new FormData();
    data.append("file", file!);
    data.append("upload_preset", "restaurant");

    const res = await fetch("https://api.cloudinary.com/v1_1/lamadev/image", {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      body: data,
    });

    const resData = await res.json();
    return resData.url;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const url = await upload();
      const res = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        body: JSON.stringify({
          img: url,
          ...inputs,
          options,
        }),
      });

      const data = await res.json();

      router.push(`/product/${data.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center text-[#cdbb63] ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-6 max-w-lg w-full"
      >
        <h1 className="text-2xl mt-[400px] sm:text-4xl mb-4 text-[#cdbb63] font-bold w-full text-center">
          Add New Product
        </h1>
        <div className="w-full flex flex-col gap-2">
          <label
            className="text-sm cursor-pointer flex gap-4 items-center"
            htmlFor="file"
          >
            <BsCloudUploadFill />
            <span>Upload Image</span>
          </label>
          <input
            type="file"
            onChange={handleChangeImg}
            id="file"
            className="hidden"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm">Title</label>
          <input
            className="ring-1 ring-[#cdbb63]  p-2 sm:p-4 rounded-sm placeholder:text-gold outline-none"
            type="text"
            placeholder="Bella Napoli"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm">Description</label>
          <textarea
            rows={3}
            className="ring-1 ring-[#cdbb63]  p-2 sm:p-4 rounded-sm placeholder:text-gold outline-none"
            placeholder="A timeless favorite with a twist, showcasing a thin crust topped with sweet tomatoes, fresh basil and creamy mozzarella."
            name="desc"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm">Price</label>
          <input
            className="ring-1 ring-[#cdbb63]  p-2 sm:p-4 rounded-sm placeholder:text-gold outline-none"
            type="number"
            placeholder="29"
            name="price"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm">Category</label>
          <input
            className="ring-1 ring-[#cdbb63] p-2 sm:p-4 rounded-sm placeholder:text-gold outline-none"
            type="text"
            placeholder="pizzas"
            name="catSlug"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm">Options</label>
          <div className="flex flex-wrap gap-2">
            <input
              className="ring-1 ring-[#cdbb63] p-2 sm:p-4 rounded-sm placeholder:text-gold outline-none flex-grow"
              type="text"
              placeholder="Title"
              name="title"
              onChange={changeOption}
            />
            <input
              className="ring-1 ring-[#cdbb63] p-2 sm:p-4 rounded-sm placeholder:text-gold outline-none flex-grow"
              type="number"
              placeholder="Additional Price"
              name="additionalPrice"
              onChange={changeOption}
            />
            <button
              className="bg-[#766d46] flex items-center justify-center hover:bg-[#6c661b] p-2 text-white rounded-sm"
              onClick={(e) => {
                e.preventDefault();
                setOptions((prev) => [...prev, option]);
              }}
            >
              Add Option
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {options.map((opt) => (
              <div
                key={opt.title}
                className="p-2 rounded-md cursor-pointer bg-[#796d2f] text-gold"
                onClick={() =>
                  setOptions((prev) =>
                    prev.filter((item) => item.title !== opt.title)
                  )
                }
              >
                <span>{opt.title}</span>
                <span className="text-xs"> (+ ${opt.additionalPrice})</span>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-[#796f04] hover:bg-[#4f4804] transition-all ease-out p-4 gap-3 mb-4 text-white w-full rounded-md relative h-14 flex items-center justify-center"
        >
          Submit <BsArrowRight />
        </button>
      </form>
    </div>
  );
};

export default AddPage;
