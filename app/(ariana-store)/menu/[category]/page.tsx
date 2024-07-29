"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ProductType } from "../../../../types/types";
import { useCartStore } from "../../../../utils/store";

type Props = {
  params: { category: string };
};

const getData = async (category: string) => {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/products?cat=${category}`,
    {
      cache: "no-store",
      method: "GET",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return data.map((product: any) => ({
    ...product,
    id: product._id,
  }));
};

const CategoryPage = ({ params }: Props) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const { category } = params;
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(category);
        console.log("Fetched products:", data); // Add this line to log fetched data
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [category]);

  const handleAddToCart = (product: ProductType) => {
    console.log("Product to be added:", product); // Log the entire product object

    if (product.id) {
      addToCart({
        id: product.id,
        title: product.title,
        quantity: 1,
        price: product.price,
        img: product.img,
      });
    } else {
      console.error("Product id is undefined:", product);
    }
  };

  return (
    <div className="flex flex-wrap text-[#79722e]">
      {products.map((item) => (
        <div
          className="w-full h-[60vh] border-r-2 border-b-2 border-[#a3972e] sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group odd:bg-[#e6e0b4]"
          key={item.id}
        >
          <Link href={`/products/${item.id}`} className="h-[80%] relative">
            {item.img && (
              <div className="relative h-full">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </Link>
          <div className="flex items-center justify-between font-bold">
            <h1 className="text-2xl uppercase p-2">{item.title}</h1>
            <h2 className="group-hover:hidden text-xl">${item.price}</h2>
            <button
              className="hidden group-hover:block uppercase bg-[#948636] text-white p-2 rounded-md"
              onClick={() => handleAddToCart(item)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryPage;
