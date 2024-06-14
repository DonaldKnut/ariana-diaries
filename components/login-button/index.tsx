import { FcGoogle } from "react-icons/fc";

export default function Button({
  text,
  onClick,
  className,
}: {
  text: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      className={`rounded-md bg-[#5f511c] hover:bg-[#a6a377] hover:text-[#4e4419] py-4 px-9 text-base flex gap-3 font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp ${className}`}
      onClick={onClick}
    >
      <FcGoogle className="text-2xl" />
      {text}
    </button>
  );
}
