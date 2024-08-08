"use client";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface FormState {
  name: string;
  email: string;
  password: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  password: "",
};

const SignUpForm = () => {
  const [state, setState] = useState<FormState>(initialState);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [csrfToken, setCsrfToken] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    // Fetch CSRF token
    const fetchCsrfToken = async () => {
      const response = await fetch("/api/csrf-token", {
        method: "GET",
        credentials: "include", // Include credentials (cookies)
      });
      const data = await response.json();
      if (response.ok) {
        setCsrfToken(data.csrfToken);
      } else {
        console.error("Failed to fetch CSRF token");
      }
    };

    fetchCsrfToken();
  }, []);

  useEffect(() => {
    // Enable button if all fields have values
    setIsButtonDisabled(!(state.name && state.email && state.password));
  }, [state]);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return re.test(String(password));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { name, email, password } = state;

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email address");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, and a number"
      );
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "CSRF-Token": csrfToken, // Include CSRF token in headers
        },
        credentials: "include", // Include credentials (cookies)
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Account created successfully");
        setState(initialState);
        // Redirect to login page after a short delay
        setTimeout(() => {
          router.push("/auth/login");
        }, 1000);
      } else {
        setError(data.msg || "Something went wrong");
      }
    } catch (error) {
      setError("Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 bg-[#463418] text-white rounded-[19px] shadow-md">
      <Image
        src="/ariana_white.png"
        alt="ariana icon"
        width="180"
        height="180"
      />
      <h2 className="text-xl font-semibold mb-3 mt-3">Get Started</h2>
      <p className="mb-6">
        Already have an account?{" "}
        <a
          href="/auth/login"
          className="text-[#dcc187] hover:text-[#f1dcae] hover:underline"
        >
          Login
        </a>
      </p>
      <form onSubmit={handleSubmit}>
        {error && <div className="text-red-300 mb-4">{error}</div>}
        {success && <div className="text-green-300 mb-4">{success}</div>}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            value={state.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-[#4a4335] text-white focus:outline-none focus:border-yellow-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={state.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-[#4a4335] text-white focus:outline-none focus:border-yellow-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={state.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-[#4a4335] text-white focus:outline-none focus:border-yellow-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 px-4 py-2 text-[#e0ae1acc] focus:outline-none"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-lg font-semibold transition duration-200 ${
            isButtonDisabled
              ? "bg-[#4b4535] text-[#fffbf1] cursor-not-allowed"
              : "bg-[#dcc187] text-[#4a4335] hover:bg-[#695d3b] hover:text-[#fff]"
          }`}
          disabled={isButtonDisabled}
        >
          {isLoading ? "Loading..." : "Create Account"}
        </button>
        <p className="mt-4 text-xs text-gray-400">
          By Signing up I agree to the{" "}
          <a
            href="/terms"
            className="underline hover:no-underline hover:text-[#dcc187]"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="underline hover:no-underline hover:text-[#dcc187]"
          >
            Privacy Policy
          </a>
          .
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
