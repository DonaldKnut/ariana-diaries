import Image from "next/image";
import Link from "next/link";

const ErrorPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#5c4312] text-white p-4">
      <div className="flex items-center max-w-md w-full">
        <Image
          src="/error-img.png"
          alt="404 Error"
          className="mb-6"
          width="320"
          height="320"
        />
        <div>
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-center mb-6">
            Some places are great to lose yourself in, but not on this occasion.
            You can return to the homepage.
          </p>
          <Link href="/">
            <button className="bg-white text-green-700 py-2 px-4 rounded-lg shadow-md hover:bg-gray-200 transition duration-300">
              Homepage
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
