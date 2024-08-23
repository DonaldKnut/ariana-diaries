"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ProductType } from "../../../../types/types";
import { useCartStore } from "../../../../utils/store";
import Spinner from "../../../../spinner";
import Notification from "../../../../constants/Notification";

type Props = {
  params: { category: string };
};

const getData = async (category: string) => {
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

const CategoryPage = ({ params }: Props) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(
    null
  );
  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "success"
  );

  const { data: session } = useSession(); // Get session
  const router = useRouter(); // Get router instance
  const { category } = params;
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(category);
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
    if (!session) {
      router.push("/auth/login");
      return;
    }

    if (product.id) {
      addToCart({
        id: product.id,
        title: product.title,
        quantity: 1,
        price: product.price,
        img: product.img,
      });
      setNotificationMessage("Product added to cart successfully!");
      setNotificationType("success");
    } else {
      setNotificationMessage("Failed to add product to cart.");
      setNotificationType("error");
      console.error("Product id is undefined:", product);
    }
  };

  const handleNotificationClose = () => {
    setNotificationMessage(null);
  };

  if (loading) {
    return <Spinner />;
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center">
        <Image
          src="/desc-images/no-cat.png"
          alt="No Products"
          width={300}
          height={300}
          className="mb-4"
        />
        <h1 className="text-2xl font-bold text-[#79722e]">No Products?</h1>
        <p className="text-lg text-[#79722e]">
          Contact admin{" "}
          <span>
            <a href="#" className="text-[#454016] hover:underline">
              Contact Admin
            </a>
          </span>
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap text-[#79722e]">
      {notificationMessage && (
        <Notification
          message={notificationMessage}
          type={notificationType}
          onClose={handleNotificationClose}
        />
      )}
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
