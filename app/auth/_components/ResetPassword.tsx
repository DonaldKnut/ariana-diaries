// pages/auth/reset-password.tsx
"use client";
import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const ResetPassword = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to reset password");
      }

      setMessage("Password has been reset successfully");
      router.push("/auth/login");
    } catch (err) {
      setError("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="p-8 bg-[#463418] text-white rounded-[19px] shadow-md">
      <h2 className="text-xl font-semibold mb-3 mt-3">Reset Password</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="text-red-300 mb-4">{error}</div>}
        {message && <div className="text-green-300 mb-4">{message}</div>}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="password">
            New Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-[#4a4335] text-white focus:outline-none focus:border-yellow-400"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="confirmPassword"
          >
            Confirm New Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-[#4a4335] text-white focus:outline-none focus:border-yellow-400"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 rounded-lg font-semibold bg-[#dcc187] text-[#4a4335] hover:bg-[#695d3b] hover:text-[#fff] transition duration-200"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
