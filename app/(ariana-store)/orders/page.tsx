import React from "react";
import { PiPackageBold } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { LiaGiftSolid } from "react-icons/lia";
import { TbAdFilled } from "react-icons/tb";

const OrdersPage = () => {
  return (
    <div className="p-4 lg:px-20 xl:px-40 mt-40">
      <table className="w-full border-separate border-spacing-3">
        <thead>
          <tr className="text-left">
            <th className="hidden md:block">
              Order ID <PiPackageBold />
            </th>
            <th>
              Date <SlCalender />
            </th>
            <th>
              Price <RiMoneyDollarCircleFill />
            </th>
            <th className="hidden md:block">
              Products <LiaGiftSolid />
            </th>
            <th>
              Status <TbAdFilled />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-sm md:text-base bg-[#b5a466]">
            <td className="hidden md:block py-6 px-1">1237861238721</td>
            <td className="py-6 px-1">19.07.2023</td>
            <td className="py-6 px-1">89.90</td>
            <td className="hidden md:block py-6 px-1">
              Big Burger Menu (2), Veggie Pizza (2), Coca Cola 1L (2)
            </td>
            <td className="py-6 px-1">On the way (approx. 10min)...</td>
          </tr>
          <tr className="text-sm md:text-base bg-[#948e75]">
            <td className="hidden md:block py-6 px-1">1237861238721</td>
            <td className="py-6 px-1">19.07.2023</td>
            <td className="py-6 px-1">89.90</td>
            <td className="hidden md:block py-6 px-1">
              Big Burger Menu (2), Veggie Pizza (2), Coca Cola 1L (2)
            </td>
            <td className="py-6 px-1">On the way (approx. 10min)...</td>
          </tr>
          <tr className="text-sm md:text-base bg-[#b5a466]">
            <td className="hidden md:block py-6 px-1">1237861238721</td>
            <td className="py-6 px-1">19.07.2023</td>
            <td className="py-6 px-1">89.90</td>
            <td className="hidden md:block py-6 px-1">
              Big Burger Menu (2), Veggie Pizza (2), Coca Cola 1L (2)
            </td>
            <td className="py-6 px-1">On the way (approx. 10min)...</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
