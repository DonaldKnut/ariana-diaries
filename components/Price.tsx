"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FaCirclePlus } from "react-icons/fa6";
import { useCartStore } from "../utils/store";

type Props = {
  price: number;
  id: string;
  options?: { title: string; additionalPrice: number }[];
};

const Price = ({ price, id, options }: Props) => {
  const [total, setTotal] = useState(price);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);
  const { data: session } = useSession(); // Get session
  const router = useRouter(); // Get router instance
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    if (options && options[selected]) {
      setTotal(quantity * (price + options[selected].additionalPrice));
    } else {
      setTotal(quantity * price);
    }
  }, [quantity, selected, options, price]);

  const handleAddToCart = () => {
    if (!session) {
      router.push("/auth/login"); // Redirect to login if not signed in
      return;
    }

    const selectedItem = {
      id: id.toString(),
      title: options && options[selected] ? options[selected].title : "",
      quantity,
      price:
        options && options[selected]
          ? price + options[selected].additionalPrice
          : price,
    };
    addToCart(selectedItem);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">${total.toFixed(2)}</h2>
      <div className="flex gap-4">
        {options?.map((option, index) => (
          <button
            key={option.title}
            className="min-w-[6rem] p-2 rounded-md"
            style={{
              background: selected === index ? "#b09b40" : "white",
              color: selected === index ? "white" : "#b09b40",
            }}
            onClick={() => setSelected(index)}
          >
            {option.title}
          </button>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex justify-between w-full p-3 ring-1 ring-[#f6d687]">
          <span>Quantity</span>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            >
              {"<"}
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 9))}
            >
              {">"}
            </button>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="uppercase w-56 flex gap-3 justify-center items-center bg-[#b09b40] text-white p-3 ring-1 ring-[#f6d687]"
        >
          Add to Cart <FaCirclePlus />
        </button>
      </div>
    </div>
  );
};

export default Price;
