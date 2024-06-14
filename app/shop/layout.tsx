import React, { ReactNode } from "react";
import Notification from "../../components/Notification";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className="container mx-auto flex-1 p-4 mt-[60px] text-white">
      <Notification />
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
