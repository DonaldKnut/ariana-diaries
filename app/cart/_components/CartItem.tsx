import React from "react";
import Image from "next/image";
import { IoIosCloseCircle } from "react-icons/io";
import { Reveal } from "../../reveal";

interface CartItemProps {
  id: string; // Change this to string for MongoDB ObjectId
  title: string;
  quantity: number;
  price: number;
  img?: string;
  optionTitle?: string;
  onRemove: (itemId: string) => void; // Ensure this expects string
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  title,
  quantity,
  price,
  img,
  optionTitle,
  onRemove,
}) => {
  return (
    <div className="flex items-center justify-between mb-4 border-b pb-4">
      {img && (
        <Reveal>
          <Image src={img} alt={title} width={100} height={100} />
        </Reveal>
      )}
      <div className="flex flex-col">
        <h1 className="uppercase text-xl font-bold">
          {title} {optionTitle && `(${optionTitle})`}
        </h1>
        <span className="text-gray-600">Quantity: {quantity}</span>
        <span className="text-gray-600">Price: ${price.toFixed(2)} each</span>
      </div>
      <h2 className="font-bold">${(price * quantity).toFixed(2)}</h2>
      <span className="cursor-pointer" onClick={() => onRemove(id)}>
        <IoIosCloseCircle className="text-4xl hover:text-[#efd882] transition-all duration-300 ease-out" />
      </span>
    </div>
  );
};

export default CartItem;
