"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
// import { useCart } from "../context/CartContext";
import { useCartStore } from "../utils/store";

const CartIconBeta = () => {
  // const { cartCount } = useCart();
  const { totalItems } = useCartStore();

  return (
    <Link href="/cart" className="relative flex items-center gap-4">
      <div className="relative w-8 h-8">
        <Image src="/cart.png" alt="Cart" fill />
        {totalItems > 0 && (
          <span className="absolute top-0 right-[-10px] bg-[#3c3215] text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
            {totalItems}
          </span>
        )}
      </div>
    </Link>
  );
};

export default CartIconBeta;
