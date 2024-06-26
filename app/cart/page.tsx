"use client";
import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { useFlutterwave } from "flutterwave-react-v3";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Original Golden", size: "Large", price: 79.9 },
    { id: 2, name: "Golden Premium Glass", size: "Small", price: 39.9 },
    { id: 3, name: "Sicilian", size: "Large", price: 79.9 },
  ]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const deliveryCost = 0; // Assuming free delivery in your example
  const totalAmount = subtotal + deliveryCost;

  const { data: session } = useSession();
  const router = useRouter();

  const customerName = session?.user?.name || "Customer"; // Default to "Customer" if name is undefined

  const config = {
    public_key: process.env.FLUTTERWAVE_PUBLIC_KEY || "",
    tx_ref: Date.now().toString(), // Convert tx_ref to string
    amount: totalAmount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: session?.user?.email || "openiyiibrahim@gmail.com", // Use session user's email or default
      phonenumber: "070********", // Corrected to 'phonenumber'
      name: customerName,
    },
    customizations: {
      title: "Ariana Store",
      description: "Payment for items in cart",
      logo: "/ARIANA.png",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handlePayment = () => {
    if (!session) {
      // Redirect to login page if not authenticated
      router.push("/login");
      return;
    }

    handleFlutterPayment({
      callback: (response) => {
        console.log("Payment successful:", response);
      },
      onClose: () => {
        console.log("Payment closed without completion");
      },
    });
  };

  // Check if cartItems array is empty
  const isEmptyCart = cartItems.length === 0;

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
              <a href="/shop" className="text-blue-500 hover:underline">
                Start shopping
              </a>
            </div>
          </div>
        ) : (
          // Render cart items if not empty
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-4"
            >
              <Image src="/temporary/p1.png" alt="" width={100} height={100} />
              <div>
                <h1 className="uppercase text-xl font-bold">{item.name}</h1>
                <span>{item.size}</span>
              </div>
              <h2 className="font-bold">${item.price.toFixed(2)}</h2>
              <span className="cursor-pointer">
                <IoIosCloseCircle className="text-4xl hover:text-[#efd882] transition-all duration-300 ease-out" />
              </span>
            </div>
          ))
        )}
      </div>
      {/* PAYMENT CONTAINER */}
      <div className="h-full p-4 rounded-[33px]  bg-[#ffffff] text-[#4a3b0e] flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6">
        <div className="flex justify-between">
          <span className="">Subtotal ({cartItems.length} items)</span>
          <span className="">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="">Service Cost</span>
          <span className="">$0.00</span>
        </div>
        <div className="flex justify-between">
          <span className="">Delivery Cost</span>
          <span className="text-[#2c6e14]">FREE!</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <span className="">TOTAL(INCL. VAT)</span>
          <span className="font-bold">${totalAmount.toFixed(2)}</span>
        </div>
        <button
          className="bg-[#60470d] flex items-center justify-center gap-3 hover:bg-[#dfc984] hover:text-[#6e511f] text-white p-3 rounded-md w-[152px] self-end transition-all duration-300 ease-in-out"
          onClick={handlePayment} // Call handlePayment function on button click
        >
          CHECKOUT
          <BsBoxArrowUpRight />
        </button>
      </div>
    </div>
  );
};

export default CartPage;
