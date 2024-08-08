"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ProductType } from "../../../../types/types";
import { useCartStore } from "../../../../utils/store";
import Spinner from "../../../../spinner";

type Props = {
  params: { category: string };
};

const getData = async (category: string) => {
  console.log(`Fetching products for category: ${category}`);
  const res = await fetch(`/api/products?cat=${category}`, {
    cache: "no-store",
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return data.map((product: any) => ({
    ...product,
    id: product._id,
  }));
};

// Spinner component
// const Spinner = () => (
//   <div className="flex justify-center items-center w-full h-screen">
//     <div className="loader">Loading...</div>
//     <style jsx>{`
//       .loader,
//       .loader:before,
//       .loader:after {
//         border-radius: 50%;
//       }
//       .loader {
//         color: #79722e;
//         font-size: 11px;
//         text-indent: -99999em;
//         margin: 0 auto;
//         position: relative;
//         width: 10em;
//         height: 10em;
//         box-shadow: inset 0 0 0 1em;
//         transform: translateZ(0);
//       }
//       .loader:before,
//       .loader:after {
//         position: absolute;
//         content: "";
//       }
//       .loader:before {
//         width: 5.2em;
//         height: 10.2em;
//         background: #e6e0b4;
//         border-radius: 10.2em 0 0 10.2em;
//         top: -0.1em;
//         left: -0.1em;
//         transform-origin: 5.1em 5.1em;
//         animation: load2 2s infinite ease 1.5s;
//       }
//       .loader:after {
//         width: 5.2em;
//         height: 10.2em;
//         background: #e6e0b4;
//         border-radius: 0 10.2em 10.2em 0;
//         top: -0.1em;
//         left: 5.1em;
//         transform-origin: 0.1em 5.1em;
//         animation: load2 2s infinite ease;
//       }
//       @keyframes load2 {
//         0% {
//           transform: rotate(0deg);
//         }
//         100% {
//           transform: rotate(360deg);
//         }
//       }
//     `}</style>
//   </div>
// );

const CategoryPage = ({ params }: Props) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
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
      } finally {
        setLoading(false);
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

  if (loading) {
    return <Spinner />;
  }

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
