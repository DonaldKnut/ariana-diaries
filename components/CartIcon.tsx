"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useCart } from "../context/CartContext";

const CartIcon = () => {
  const { cartCount } = useCart();

  return (
    <Link href="/cart" className="flex items-center gap-4">
      <div className="relative w-8 h-8 md:w-5 md:h-5">
        <Image src="/cart.png" alt="" fill />
      </div>
      {cartCount > 0 && <span>Cart ({cartCount})</span>}
    </Link>
  );
};

export default CartIcon;
