"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { BsCloudUploadFill, BsArrowRight } from "react-icons/bs";
import ImageUpload from "../../components/ImageUpload";
import { FaSpinner } from "react-icons/fa";
import { Inputs, Option, Errors } from "../../lib/zodSchemas";
import { validateInputs } from "../../lib/useValidation";
import OptionsField from "../../components/OptionsField";

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
  const [state, setState] = useState<{ image: string }>({ image: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated" || !session?.user?.isAdmin) {
      router.push("/");
    }
  }, [status, session]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateInputs(inputs, state.image);
    if (errors) {
      setErrors(errors);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/add", {
        method: "POST",
        body: JSON.stringify({
          img: state.image,
          ...inputs,
          options,
        }),
      });

      const data = await res.json();
      router.push(`/products/${data._id}`);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
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
          <ImageUpload
            setFormData={setInputs}
            state={state}
            setState={setState}
          />
          {errors.image && <span className="text-red-500">{errors.image}</span>}
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm">Title</label>
          <input
            className="ring-1 ring-[#cdbb63] p-2 sm:p-4 rounded-sm placeholder:text-gold outline-none"
            type="text"
            placeholder="Bella Napoli"
            name="title"
            onChange={handleChange}
          />
          {errors.title && <span className="text-red-500">{errors.title}</span>}
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm">Description</label>
          <textarea
            rows={3}
            className="ring-1 ring-[#cdbb63] p-2 sm:p-4 rounded-sm placeholder:text-gold outline-none"
            placeholder="A timeless favorite with a twist, showcasing a thin crust topped with sweet tomatoes, fresh basil and creamy mozzarella."
            name="desc"
            onChange={handleChange}
          />
          {errors.desc && <span className="text-red-500">{errors.desc}</span>}
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm">Price</label>
          <input
            className="ring-1 ring-[#cdbb63] p-2 sm:p-4 rounded-sm placeholder:text-gold outline-none"
            type="number"
            placeholder="29"
            name="price"
            onChange={handleChange}
          />
          {errors.price && <span className="text-red-500">{errors.price}</span>}
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
          {errors.catSlug && (
            <span className="text-red-500">{errors.catSlug}</span>
          )}
        </div>
        <OptionsField
          option={option}
          options={options}
          setOption={setOption}
          setOptions={setOptions}
        />
        <button
          type="submit"
          className={`bg-[#796f04] hover:bg-[#4f4804] transition-all ease-out p-4 gap-3 mb-4 text-white w-full rounded-md relative h-14 flex items-center justify-center ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <>
              Submit <BsArrowRight />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddPage;
