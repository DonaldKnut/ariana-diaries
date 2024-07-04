// Button.tsx
import { ReactElement, MouseEvent } from "react";

interface ButtonProps {
  text?: string; // Make text optional to handle children case
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  icon: ReactElement;
  className?: string;
  type?: "submit" | "button";
  disabled?: boolean; // Added disabled prop
  children?: React.ReactNode; // Added children prop
}

export default function Button({
  text,
  onClick,
  icon,
  className,
  type = "button",
  disabled = false, // Default to false
  children,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`flex items-center rounded-[32px] bg-[#564b1b] hover:bg-[#827836] gap-2 py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp ${className}`}
      onClick={onClick}
      disabled={disabled} // Apply disabled prop
    >
      {icon}
      {text || children} {/* Use either text or children */}
    </button>
  );
}
