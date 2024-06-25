// components/Header.tsx
"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { GlobalContext } from "../../context";
import { BiLogOut } from "react-icons/bi";
import { FaPlusCircle } from "react-icons/fa";
import { SubMenuItem } from "../../utils/types";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { CgChevronDownO } from "react-icons/cg";
import Button from "../button";
import ThemeToggler from "../theme";
import { menuItems } from "../../utils/index";
import { MenuItem } from "../../utils/types"; // Adjusted import
import CartIconBeta from "../CartIconBeta";
import "./index.css";

export default function Header() {
  const [sticky, setSticky] = useState<boolean>(false);
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const { data: session } = useSession();
  const { setSearchQuery, setSearchResults } = useContext(GlobalContext);
  const router = useRouter();
  const pathName = usePathname();
  const { resolvedTheme } = useTheme();

  function handleStickyNavbar() {
    if (window.scrollY >= 80) setSticky(true);
    else setSticky(false);
  }

  function handleNavbarToggle() {
    setNavbarOpen(!navbarOpen);
  }

  // Close navbar on route change
  useEffect(() => {
    setNavbarOpen(false);
  }, [pathName]);

  useEffect(() => {
    setSearchResults([]);
    setSearchQuery("");
  }, [pathName]);

  // Handle window scroll for sticky header
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
    return () => {
      window.removeEventListener("scroll", handleStickyNavbar);
    };
  }, []);

  // Toggle active submenu
  const toggleActiveSubmenu = (itemId: string) => {
    if (activeSubmenu === itemId) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(itemId);
    }
  };

  // Handle click outside to close submenu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (target.closest("#navbarCollapse") || target.closest(".group")) return;
      setActiveSubmenu(null);
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="text-[#e0c056] ">
      <header
        className={`top-0 left-0 z-40 flex w-full items-center
          ${
            sticky
              ? "!fixed !z-[9999] bg-[#5c4f34] !bg-opacity-80 shadow-sticky backdrop:blur-sm !transition dark:!bg-opacity-50"
              : "absolute"
          }
        `}
      >
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-4 xl:mr-12 gap-2 flex">
              <Link
                href={"/"}
                className={`text-[30px] font-extrabold cursor-pointer block w-full
                  ${sticky ? "py-5 lg:py-2" : "py-8"}
                `}
              >
                <Image
                  src={
                    resolvedTheme === "dark"
                      ? "/ariana_white.png"
                      : "/ARIANA.png"
                  }
                  alt="ariana logo"
                  width="170"
                  height="170"
                />
              </Link>
              {session && <CartIconBeta />}
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <div>
                <button
                  onClick={handleNavbarToggle}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="absolute ml-4 mr-6 right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
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
                <nav
                  id="navbarCollapse"
                  className={`absolute right-0 z-30 w-[250px] rounded-md border-[.5px] bg-[#453415] placeholder:border-body-color/50 py-4 
                  px-6 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100
                  ${
                    navbarOpen
                      ? "visible top-full opacity-100"
                      : "invisible top-[120%] opacity-0"
                  }
                `}
                >
                  <ul className="block lg:flex lg:space-x-12">
                    {menuItems.map((item: MenuItem) => (
                      <li
                        key={item.id}
                        className={`mt-5 mb-5 font-bold text-xl ${
                          item.subMenu ? "relative group" : ""
                        }`}
                      >
                        <div
                          className="flex items-center space-x-2 cursor-pointer"
                          onClick={() => toggleActiveSubmenu(item.id)} // Handle submenu click
                        >
                          {item.icon && (
                            <item.icon className="text-[30px] hover:text-[#b4b256]" />
                          )}
                          <span>{item.label}</span>
                          {item.subMenu && (
                            <CgChevronDownO
                              className={`text-[24px] transition-transform duration-300 ${
                                activeSubmenu === item.id ? "rotate-180" : ""
                              }`}
                            />
                          )}
                        </div>
                        {item.subMenu && activeSubmenu === item.id && (
                          <ul className="absolute left-0 mt-2 w-48 bg-[#463f1a] shadow-lg rounded-[12px] p-2 transition-opacity duration-300">
                            {item.subMenu.map((subItem: SubMenuItem) => (
                              <li
                                key={subItem.id}
                                className="mt-2 flex items-center"
                              >
                                <Link
                                  href={subItem.path}
                                  className="flex items-center gap-2 w-full px-4 py-2 text-sm rounded-[9px] z-[1000] text-white hover:bg-[#b3aa6d] transition-transform duration-300"
                                >
                                  {subItem.icon && (
                                    <subItem.icon className="mr-2 text-[24px]" />
                                  )}
                                  {subItem.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                    {session ? (
                      <>
                        <li className="mt-5 mb-5 font-bold text-xl mobile-session_links">
                          <Link
                            href="/create"
                            className="flex items-center space-x-2 hover:text-[#b3aa6d]"
                          >
                            <HiArrowTopRightOnSquare className="text-[30px]" />
                            <span className="lg:hidden">Create</span>
                          </Link>
                        </li>
                        <li className="mt-5 mb-5 font-bold text-xl mobile-session_links">
                          <button
                            onClick={() => signOut()}
                            className="flex items-center space-x-2 hover:text-[#decf71]"
                          >
                            <HiArrowTopRightOnSquare className="text-[30px]" />
                            <span className="lg:hidden">Logout</span>
                          </button>
                        </li>
                      </>
                    ) : (
                      <li className="mt-5 mb-5 font-bold text-xl lg:hidden">
                        <Link
                          href="/auth/login"
                          className="flex items-center space-x-2 hover:text-[#decf71] mobile-session_links"
                        >
                          <span>Login</span>
                          <HiArrowTopRightOnSquare className="text-[30px]" />
                        </Link>
                      </li>
                    )}
                  </ul>
                </nav>
              </div>
              <div className="flex gap-3 items-center">
                {session ? (
                  <div className="flex gap-3">
                    <Button
                      onClick={() => router.push("/create")}
                      text="Create"
                      className="navbar-button mr-3 hidden lg:flex"
                      icon={<FaPlusCircle />}
                    />
                    <Button
                      onClick={() => signOut()}
                      text="Logout"
                      icon={<BiLogOut />}
                      className="navbar-button mr-10 hidden lg:flex"
                    />
                  </div>
                ) : (
                  <Button
                    onClick={() => router.push("/auth/login")}
                    text="Login"
                    icon={<HiArrowTopRightOnSquare />}
                    className="login_home-button hidden lg:flex"
                  />
                )}

                <ThemeToggler />
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
