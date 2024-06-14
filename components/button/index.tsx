import { ReactElement, MouseEvent } from "react";

interface ButtonProps {
  text: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void; // Make onClick optional
  icon: ReactElement;
  className?: string;
  type?: "submit" | "button";
}

export default function Button({
  text,
  onClick,
  icon,
  className,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`flex items-center bg-[#564b1b] hover:bg-[#827836] gap-2 rounded-md py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp ${className}`}
      onClick={onClick} // Include onClick only if it's provided
    >
      {icon}
      {text}
    </button>
  );
}
