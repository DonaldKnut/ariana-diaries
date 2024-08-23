"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import CartItem from "./_components/CartItem";
import CartSummary from "./_components/CartSummary";
import Notification from "../../constants/Notification";
import { loadStripe } from "@stripe/stripe-js";
import EmptyCart from "../EmptyCart";
import { useCartStore } from "../../utils/store";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CartPage = () => {
  const { products, totalPrice, totalItems, removeFromCart } = useCartStore();
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [usdTotalPrice, setUsdTotalPrice] = useState(0);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(
    null
  );
  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "success"
  );

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
        const conversionRate = data.conversion_rates.USD;
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

      const { sessionId } = await res.json();
      const stripe = await stripePromise;

      if (!stripe) {
        throw new Error("Stripe.js has not loaded properly.");
      }

      const result = await stripe.redirectToCheckout({ sessionId });
      if (result.error) {
        console.error("Stripe checkout error:", result.error.message);
        setNotificationMessage(`Checkout error: ${result.error.message}`);
        setNotificationType("error");
      } else {
        setNotificationMessage("Redirecting to payment...");
        setNotificationType("success");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Checkout error:", error.message);
        setNotificationMessage(`Checkout error: ${error.message}`);
        setNotificationType("error");
      } else {
        console.error("Checkout error:", error);
        setNotificationMessage("An unknown error occurred during checkout.");
        setNotificationType("error");
      }
    }
  };

  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId);
    setNotificationMessage(`Removed item from cart`);
    setNotificationType("success");
  };

  const handleNotificationClose = () => {
    setNotificationMessage(null);
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
      {notificationMessage && (
        <Notification
          message={notificationMessage}
          type={notificationType}
          onClose={handleNotificationClose}
        />
      )}
      {/* PRODUCTS CONTAINER */}
      <div className="h-1/2 p-4 flex flex-col justify-center overflow-scroll lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40">
        {isEmptyCart ? (
          <EmptyCart />
        ) : (
          products.map((item) => (
            <CartItem
              key={`${item.id}-${item.optionTitle || ""}`}
              id={item.id}
              title={item.title}
              quantity={item.quantity}
              price={item.price}
              img={item.img}
              optionTitle={item.optionTitle}
              onRemove={handleRemoveItem}
            />
          ))
        )}
      </div>
      {/* PAYMENT CONTAINER */}
      <CartSummary
        cartCount={totalItems}
        totalPrice={totalPrice}
        usdTotalPrice={usdTotalPrice}
        isEmptyCart={isEmptyCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default CartPage;
