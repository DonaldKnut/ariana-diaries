"use client";
import { useCartStore } from "../../utils/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { Reveal } from "../reveal";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CartPage = () => {
  const { products, totalItems, totalPrice, removeFromCart } = useCartStore();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [usdTotalPrice, setUsdTotalPrice] = useState(0);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    const convertCurrency = async () => {
      try {
        const res = await fetch(
          "https://v6.exchangerate-api.com/v6/c32b0e8f419dbb9f1ab38062/latest/USD"
        );
        const data = await res.json();
        const conversionRate = data.conversion_rates.USD; // Assuming you want to convert to USD
        setUsdTotalPrice(totalPrice * conversionRate);
      } catch (error) {
        console.error("Error converting currency:", error);
      }
    };

    convertCurrency();
  }, [totalPrice]);

  const handleCheckout = async () => {
    if (!session) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          price: totalPrice,
          products,
          status: "Not Paid!",
          userEmail: session.user.email,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message || "An error occurred during checkout"
        );
      }

      const { order, sessionId } = await res.json();

      const stripe = await stripePromise;

      if (!stripe) {
        throw new Error("Stripe.js has not loaded properly.");
      }

      const result = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (result.error) {
        console.error("Stripe checkout error:", result.error.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Checkout error:", error.message);
        alert(`Checkout error: ${error.message}`);
      } else {
        console.error("Checkout error:", error);
        alert("An unknown error occurred during checkout.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  const isEmptyCart = products.length === 0;

  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-[#c5a247] lg:flex-row mt-[130px]">
      {/* PRODUCTS CONTAINER */}
      <div className="h-1/2 p-4 flex flex-col justify-center overflow-scroll lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40">
        {isEmptyCart ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Image
                src="/desc-images/no-cat.png"
                alt="Empty Cart Image"
                width={200}
                height={200}
              />
              <p className="text-xl mt-4">No items in cart</p>
              <Link href="/shop" className="text-[#c0a928] hover:underline">
                Start shopping
              </Link>
            </div>
          </div>
        ) : (
          products.map((item) => (
            <div
              className="flex items-center justify-between mb-4"
              key={`${item.id}-${item.title}`}
            >
              {item.img && (
                <Reveal>
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={100}
                    height={100}
                  />
                </Reveal>
              )}
              <div>
                <h1 className="uppercase text-xl font-bold">
                  {item.title} x{item.quantity}
                </h1>
                <span>{item.optionTitle}</span>
              </div>
              <h2 className="font-bold">
                ${(item.price * item.quantity).toFixed(2)}
              </h2>
              <span
                className="cursor-pointer"
                onClick={() => removeFromCart(item)}
              >
                <IoIosCloseCircle className="text-4xl hover:text-[#efd882] transition-all duration-300 ease-out" />
              </span>
            </div>
          ))
        )}
      </div>
      {/* PAYMENT CONTAINER */}
      <div className="h-full p-4 rounded-[33px] bg-[#ffffff] text-[#4a3b0e] flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6">
        <div className="flex justify-between">
          <span>Subtotal ({totalItems} items)</span>
          <span>${usdTotalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Service Cost</span>
          <span>$0.00</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Cost</span>
          <span className="text-[#2c6e14]">FREE!</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <span>TOTAL (INCL. VAT)</span>
          <span className="font-bold">${usdTotalPrice.toFixed(2)}</span>
        </div>
        <button
          onClick={handleCheckout}
          className={`flex items-center justify-center p-2 mt-4 rounded-lg transition-all duration-300 ease-out ${
            isEmptyCart
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#c5a247] text-[#4a3b0e] hover:bg-[#4a3b0e] hover:text-[#c5a247] cursor-pointer"
          }`}
          disabled={isEmptyCart}
        >
          <span className="mr-2">Checkout</span>
          <BsBoxArrowUpRight />
        </button>
      </div>
    </div>
  );
};

export default CartPage;
