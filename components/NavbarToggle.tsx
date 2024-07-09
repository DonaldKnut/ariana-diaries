import React from "react";

interface NavbarToggleProps {
  navbarOpen: boolean;
  handleNavbarToggle: () => void;
}

const NavbarToggle: React.FC<NavbarToggleProps> = ({
  navbarOpen,
  handleNavbarToggle,
}) => (
  <button
    onClick={handleNavbarToggle}
    id="navbarToggler"
    aria-label="Mobile Menu"
    className="ml-4 mr-6 block rounded-lg px-3 py-[6px] ring-primary focus:ring-2"
  >
    <span
      className={`relative my-1.5 block h-0.5 w-[30px] bg-[#f7d066] transition-all duration-300 dark:bg-white
      ${navbarOpen ? "top-[7px] rotate-45" : ""}
    `}
    />
    <span
      className={`relative my-1.5 block h-0.5 w-[30px] bg-[#f7d066] transition-all duration-300 dark:bg-white
      ${navbarOpen ? "opacity-0" : ""}
    `}
    />
    <span
      className={`relative my-1.5 block h-0.5 w-[30px] bg-[#f7d066] transition-all duration-300 dark:bg-white
      ${navbarOpen ? "top-[-8px] -rotate-45" : ""}
    `}
    />
  </button>
);

export default NavbarToggle;
