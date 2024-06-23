import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col md:flex-row w-full max-w-4xl mx-auto">
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          {children}
        </div>
        <div className="hidden md:block md:w-1/2 relative rounded-[33px]">
          <img
            src="/ariana-login-image.png"
            alt="Graphic"
            className="absolute inset-0 w-full h-full object-cover rounded-[23px]"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
