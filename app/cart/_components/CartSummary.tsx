import React from "react";
import { BsBoxArrowUpRight } from "react-icons/bs";

interface CartSummaryProps {
  cartCount: number;
  totalPrice: number;
  usdTotalPrice: number;
  isEmptyCart: boolean;
  onCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  cartCount,
  totalPrice,
  usdTotalPrice,
  isEmptyCart,
  onCheckout,
}) => {
  return (
    <div className="h-full p-4 rounded-[33px] bg-[#ffffff] text-[#4a3b0e] flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6">
      <div className="flex justify-between">
        <span>Subtotal ({cartCount} items)</span>
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
        onClick={onCheckout}
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
  );
};

export default CartSummary;
