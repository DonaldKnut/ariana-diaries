// pages/auth/forgot-password.tsx
"use client";
import { useState, FormEvent } from "react";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { BsFillArrowUpRightSquareFill } from "react-icons/bs";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("If the email exists, a reset link has been sent.");
        setError(""); // Clear any previous error
      } else {
        setError(data.error || "Failed to send reset link. Please try again.");
        setMessage(""); // Clear any previous message
      }
    } catch (err) {
      setError("Failed to send reset link. Please try again.");
      setMessage(""); // Clear any previous message
    }
  };

  return (
    <div className="p-8 bg-[#3d3410] text-white rounded-[10px] w-[334px] shadow-md">
      <h2 className="text-xl font-semibold mb-3 mt-3">Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="text-red-300 mb-4">{error}</div>}
        {message && <div className="text-green-300 mb-4">{message}</div>}
        <div className="mb-4">
          <label
            className="flex items-center gap-1 text-sm font-medium mb-1"
            htmlFor="email"
          >
            <MdOutlineMarkEmailUnread className="text-xl" /> Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-[#4a4335] text-white focus:outline-none focus:border-yellow-400"
          />
        </div>
        <button
          type="submit"
          className="flex items-center gap-2 justify-center w-full py-2 px-4 rounded-lg font-semibold bg-[#dcc187] text-[#4a4335] hover:bg-[#695d3b] hover:text-[#fff] transition duration-200"
        >
          Send Reset Link <BsFillArrowUpRightSquareFill />
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
