// components/Header.tsx
"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { GlobalContext } from "../../context";
import { CgProfile } from "react-icons/cg";
import { FaPlusCircle } from "react-icons/fa";
import { SubMenuItem } from "../../utils/types";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { CgChevronDownO } from "react-icons/cg";
import { SlClose } from "react-icons/sl";
import Button from "../button";
import ThemeToggler from "../theme";
import { menuItems } from "../../utils/index";
import { MenuItem } from "../../utils/types"; // Adjusted import
import CartIconBeta from "../CartIconBeta";
import { RiLogoutCircleFill } from "react-icons/ri";
import "./index.css";

export default function Header() {
  const [sticky, setSticky] = useState<boolean>(false);
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
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

  function handleShowDropdown() {
    setShowDropdown(true);
  }

  function handleHideDropdown() {
    setShowDropdown(false);
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

  // Handle click outside to close submenu and dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (
        target.closest("#navbarCollapse") ||
        target.closest(".group") ||
        target.closest(".avatar-dropdown")
      )
        return;
      setActiveSubmenu(null);
      setShowDropdown(false);
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Check if the user is an admin
  const isAdmin = session?.user?.role === "admin";

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
              <div className="flex items-center gap-3 lg:hidden ml-auto">
                {session && (
                  <div className="relative avatar-dropdown">
                    <Image
                      onClick={handleShowDropdown}
                      src={
                        session.user?.avatar?.url
                          ? session.user?.avatar?.url
                          : "/ariana-login-image.png"
                      }
                      alt="avatar"
                      width={50}
                      height={50}
                      className="rounded-full cursor-pointer avatar-img"
                    />
                    {showDropdown && (
                      <div className="absolute top-12 right-0 bg-[#453415] p-5 rounded-md shadow-lg z-[1000] mt-2">
                        <SlClose
                          onClick={handleHideDropdown}
                          className="w-full cursor-pointer"
                        />
                        <button
                          onClick={() => {
                            signOut();
                            handleHideDropdown();
                          }}
                          className="flex items-center justify-center gap-2 rounded-[8px] w-full mt-2 px-4 py-2 text-left text-white hover:bg-[#b3aa6d] transition-transform duration-300"
                        >
                          <RiLogoutCircleFill /> Logout
                        </button>
                        <Link
                          onClick={handleHideDropdown}
                          href={`/user/${session?.user?._id.toString()}`}
                          className="flex items-center justify-center gap-2 rounded-[8px] mt-2 px-4 py-2 text-left text-white hover:bg-[#b3aa6d] transition-transform duration-300"
                        >
                          <CgProfile /> Profile
                        </Link>
                      </div>
                    )}
                  </div>
                )}
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
                <ThemeToggler />
              </div>
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
                        onClick={() => {
                          if (item.subMenu) {
                            toggleActiveSubmenu(item.id);
                          } else {
                            router.push(item.path);
                          }
                        }} // Handle submenu click
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
                              {(subItem.id !== "add" || isAdmin) && ( // Conditionally render "Add Products" for admin only
                                <Link
                                  href={subItem.path}
                                  className="flex items-center gap-2 w-full px-4 py-2 text-sm rounded-[9px] z-[1000] text-white hover:bg-[#b3aa6d] transition-transform duration-300"
                                >
                                  {subItem.icon && (
                                    <subItem.icon className="mr-2 text-[24px]" />
                                  )}
                                  {subItem.label}
                                </Link>
                              )}
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
                      {/* Add Profile and Logout links for mobile menu */}
                      <li className="mt-5 mb-5 font-bold text-xl mobile-session_links">
                        <button
                          onClick={() => signOut()}
                          className="flex items-center space-x-2 hover:text-[#b3aa6d]"
                        >
                          <RiLogoutCircleFill className="text-[30px]" />
                          <span className="lg:hidden">Logout</span>
                        </button>
                      </li>
                      <li className="mt-5 mb-5 font-bold text-xl mobile-session_links">
                        <Link
                          href={`/user/${session?.user?._id.toString()}`}
                          className="flex items-center space-x-2 hover:text-[#b3aa6d]"
                        >
                          <CgProfile className="text-[30px]" />
                          <span className="lg:hidden">Profile</span>
                        </Link>
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
              <div className="hidden lg:flex items-center gap-3 mr-8">
                {session ? (
                  <div className="flex items-center gap-3">
                    <Button
                      onClick={() => router.push("/create")}
                      text="Create"
                      className="navbar-button mr-3 hidden lg:flex"
                      icon={<FaPlusCircle />}
                    />
                    <div className="relative avatar-dropdown">
                      <Image
                        onClick={handleShowDropdown}
                        src={
                          session.user?.avatar?.url
                            ? session.user?.avatar?.url
                            : "/ariana-login-image.png"
                        }
                        alt="avatar"
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full cursor-pointer mr-16"
                      />
                      {showDropdown && (
                        <div className="absolute top-12 right-0 bg-[#453415] p-5 rounded-md shadow-lg z-[1000] mt-2">
                          <SlClose
                            onClick={handleHideDropdown}
                            className="w-full cursor-pointer"
                          />
                          <button
                            onClick={() => {
                              signOut();
                              handleHideDropdown();
                            }}
                            className="flex items-center justify-center gap-2 rounded-[8px] w-full mt-2 px-4 py-2 text-left text-white hover:bg-[#b3aa6d] transition-transform duration-300"
                          >
                            <RiLogoutCircleFill /> Logout
                          </button>
                          <Link
                            onClick={handleHideDropdown}
                            href={`/user/${session?.user?._id.toString()}`}
                            className="flex items-center justify-center gap-2 rounded-[8px] mt-2 px-4 py-2 text-left text-white hover:bg-[#b3aa6d] transition-transform duration-300"
                          >
                            <CgProfile /> Profile
                          </Link>
                        </div>
                      )}
                    </div>
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
