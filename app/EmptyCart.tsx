import React from "react";
import Image from "next/image";
import Link from "next/link";

const EmptyCart: React.FC = () => {
  return (
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
  );
};

export default EmptyCart;
