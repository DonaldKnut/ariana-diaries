import Price from "../../../../components/Price";
import Image from "next/image";
import React from "react";
import { notFound } from "next/navigation";

const SingleProductPage = async ({ params }: { params: { id: string } }) => {
  const baseUrl = process.env.NEXTAUTH_URL;
  const productId = params.id;

  // Log values for debugging
  // console.log("Base URL:", baseUrl);
  // console.log("Product ID:", productId);

  // Check for undefined values
  if (!baseUrl || !productId) {
    console.error("Base URL or Product ID is missing:", { baseUrl, productId });
    notFound();
    return;
  }

  // Fetch product data
  const res = await fetch(`${baseUrl}/api/products/${productId}`);

  if (!res.ok) {
    console.error("Failed to fetch product:", res.statusText);
    notFound();
    return;
  }

  const product = await res.json();

  if (!product) {
    console.error("Product not found");
    notFound();
    return;
  }

  return (
    <div className="p-4 lg:px-20 xl:px-40 h-screen flex flex-col justify-around text-[#818035] md:flex-row md:gap-8 md:items-center">
      {/* IMAGE CONTAINER */}
      {product.img && (
        <div className="relative w-full h-1/2 md:h-[70%]">
          <Image src={product.img} alt="" className="object-contain" fill />
        </div>
      )}
      {/* TEXT CONTAINER */}
      <div className="h-1/2 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8">
        <h1 className="text-3xl font-bold uppercase xl:text-5xl">
          {product.title}
        </h1>
        <p>{product.desc}</p>
        <Price
          price={product.price}
          id={product._id.toString()}
          options={product.options}
        />
      </div>
    </div>
  );
};

export default SingleProductPage;
