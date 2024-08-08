"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import Image from "next/image";

const SuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const payment_intent = searchParams.get("payment_intent");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await fetch(`api/confirm/${payment_intent}`, {
          method: "PUT",
        });
        setTimeout(() => {
          router.push("/orders");
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, [payment_intent, router]);

  return (
    <>
      <div className="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-15rem)] mt-10 flex items-center justify-center text-center text-2xl text-green-700">
        <div className="m-auto flex flex-col items-center justify-center">
          <Image src="/paid.png" alt="paid image" width={90} height={90} />
          <p className="max-w-[600px]">
            Payment successful. You are being redirected to the orders page.
            Please do not close the page.
          </p>
          <ConfettiExplosion className="absolute m-auto" />
        </div>
      </div>
    </>
  );
};

export default SuccessPage;
