"use client";

import React from "react";
import "./page.css";
import Button from "../../components/login-button";
import { signIn } from "next-auth/react";

const Page = () => {
  return (
    <div className="mother-wrapper">
      <div className="wrapper">
        <div className="logo">
          <img
            src="/ariana_white.png"
            alt="ariana icon"
            width={270}
            height={270}
          />
        </div>
        <h1 className="text-3xl mt-4 mb-4">Get Started</h1>
        <h3 className="text-xl mt-3 mb-3">Welcome!</h3>
        <p className="w-[70%] mt-4 mb-4">
          See what&apos;s happening in the world right now.
        </p>
        <div className="login-section">
          <Button
            onClick={() => signIn("google", { callbackUrl: "/create" })}
            text="Continue with Google"
            className="w-[100%] flex items-center justify-center"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
