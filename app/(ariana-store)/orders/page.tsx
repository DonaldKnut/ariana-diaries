"use client";
import React from "react";
import { PiPackageBold } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { LiaGiftSolid } from "react-icons/lia";
import { TbTruckDelivery } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Spinner from "../../../components/Spinner";
import { OrderType } from "../../../types/types";

const OrdersPage = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/");
    return null; // Add this to avoid rendering anything before redirect
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch("http://localhost:3000/api/orders").then((res) => res.json()),
  });

  if (isLoading || status === "loading") return <Spinner />;

  if (error) return <div>Error loading orders</div>;

  return (
    <div className="p-4 lg:px-20 xl:px-40 mt-40">
      <table className="w-full border-separate border-spacing-3">
        <thead>
          <tr className="text-left">
            <th className="hidden md:block">
              Order ID <PiPackageBold className="text-2xl" />
            </th>
            <th>
              Date <SlCalender className="text-2xl" />
            </th>
            <th>
              Price <RiMoneyDollarCircleFill className="text-2xl" />
            </th>
            <th className="hidden md:block">
              Products <LiaGiftSolid className="text-2xl" />
            </th>
            <th>
              Status <TbTruckDelivery className="text-2xl" />
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item: OrderType) => (
              <tr className="text-sm md:text-base bg-[#b5a466]" key={item.id}>
                <td className="hidden md:block py-6 px-1">{item.id}</td>
                <td className="py-6 px-1">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className="py-6 px-1">{item.price}</td>
                <td className="hidden md:block py-6 px-1">
                  {item.products[0]?.title || "N/A"}
                </td>
                {session?.user?.isAdmin ? (
                  <td className="py-6 px-1">
                    <input
                      placeholder={item.status}
                      className="p-2 ring-1 ring-red-100 rounded-md"
                    />
                  </td>
                ) : (
                  <td className="py-6 px-1">{item.status}</td>
                )}
                <td className="py-6 px-1">On the way (approx. 10min)...</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
