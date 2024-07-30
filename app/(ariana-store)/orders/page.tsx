"use client";

import { OrderType } from "../../../types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { PiPackageBold } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { LiaGiftSolid } from "react-icons/lia";
import { TbTruckDelivery } from "react-icons/tb";
import Spinner from "../../../spinner";
import { RiFileEditFill } from "react-icons/ri";
import Notification from "../../../components/Popup";

const OrdersPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/");
    return null;
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch("http://localhost:3000/api/orders").then((res) => res.json()),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => {
      return fetch(`http://localhost:3000/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      setNotificationMessage("The order status has been changed to Paid!");
    },
    onError() {
      setNotificationMessage("Error updating order status.");
    },
  });

  const [editableOrderId, setEditableOrderId] = useState<string | null>(null);
  const [statusInput, setStatusInput] = useState<string>("");
  const [notificationMessage, setNotificationMessage] = useState<string | null>(
    null
  );

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    mutation.mutate({ id, status: statusInput });
    setEditableOrderId(null);
    setStatusInput("");
  };

  if (isLoading || status === "loading") return <Spinner />;

  if (error) return <div>Error loading orders</div>;

  return (
    <div className="p-4 lg:px-20 xl:px-40 mt-40">
      {notificationMessage && (
        <Notification
          message={notificationMessage}
          onClose={() => setNotificationMessage(null)}
        />
      )}
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
            data.map((item: OrderType) => {
              const isEditable = editableOrderId === item.id;

              return (
                <tr className="text-sm md:text-base bg-[#b5a466]" key={item.id}>
                  <td className="hidden md:block py-6 px-1">
                    {item.userEmail}
                  </td>
                  <td className="py-6 px-1">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-6 px-1">{item.price}</td>
                  <td className="hidden md:block py-6 px-1">
                    {item.products[0]?.title || "N/A"}
                  </td>
                  {session?.user?.isAdmin ? (
                    <td>
                      {isEditable ? (
                        <form
                          className="flex items-center justify-center gap-4"
                          onSubmit={(e) => handleUpdate(e, item.id)}
                        >
                          <input
                            value={statusInput}
                            onChange={(e) => setStatusInput(e.target.value)}
                            placeholder={item.status}
                            className="p-2 ring-1 ring-red-100 rounded-md"
                          />
                          <button
                            type="submit"
                            className="bg-[#77770b] p-2 rounded-full"
                          >
                            Update
                          </button>
                        </form>
                      ) : (
                        <div className="flex items-center gap-4">
                          <span>{item.status}</span>
                          <button
                            onClick={() => {
                              setEditableOrderId(item.id);
                              setStatusInput(item.status);
                            }}
                            className="bg-[#77770b] p-2 rounded-full"
                          >
                            <RiFileEditFill />
                          </button>
                        </div>
                      )}
                    </td>
                  ) : (
                    <td className="py-6 px-1">{item.status}</td>
                  )}
                  <td className="py-6 px-1">On the way (approx. 10min)...</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
