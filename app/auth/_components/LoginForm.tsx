"use client";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LoginFormState {
  email: string;
  password: string;
}

const initialLoginState: LoginFormState = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [state, setState] = useState<LoginFormState>(initialLoginState);
  const [error, setError] = useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    // Enable button if all fields have values
    setIsButtonDisabled(!(state.email && state.password));
  }, [state]);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password } = state;

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email address");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/create");
      }
    } catch (error) {
      setError("Failed to login");
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
      <h2 className="text-xl font-semibold mb-3 mt-3">Login</h2>
      <p className="mb-6">
        Don't have an account?{" "}
        <a
          href="/auth/signup"
          className="text-[#dcc187] hover:text-[#f1dcae] hover:underline"
        >
          Signup
        </a>
      </p>
      <form onSubmit={handleSubmit}>
        {error && <div className="text-red-300 mb-4">{error}</div>}
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
          {isLoading ? "Loading..." : "Login"}
        </button>
        <p className="mt-4 text-xs text-gray-400">
          By Signing in I agree to the{" "}
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

export default LoginForm;
