"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { GlobalContext } from "../../context";
import { menuItems } from "../../utils/index";
import Button from "../button";
import ThemeToggler from "../theme";
import CartIconBeta from "../CartIconBeta";
import UserAvatar from "../UserAvatar";
import NavbarToggle from "../NavbarToggle";
import NavbarMenu from "../NavbarMenu";
import "./index.css";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { FaPlusCircle } from "react-icons/fa";

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

  useEffect(() => {
    setNavbarOpen(false);
  }, [pathName]);

  useEffect(() => {
    setSearchResults([]);
    setSearchQuery("");
  }, [pathName]);

  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
    return () => {
      window.removeEventListener("scroll", handleStickyNavbar);
    };
  }, []);

  const toggleActiveSubmenu = (itemId: string) => {
    if (activeSubmenu === itemId) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(itemId);
    }
  };

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
                  <UserAvatar
                    session={session}
                    showDropdown={showDropdown}
                    handleShowDropdown={handleShowDropdown}
                    handleHideDropdown={handleHideDropdown}
                  />
                )}
                <NavbarToggle
                  navbarOpen={navbarOpen}
                  handleNavbarToggle={handleNavbarToggle}
                />
                <ThemeToggler />
              </div>
              <NavbarMenu
                menuItems={menuItems}
                activeSubmenu={activeSubmenu}
                toggleActiveSubmenu={toggleActiveSubmenu}
                isAdmin={isAdmin}
                navbarOpen={navbarOpen}
              />
              <div className="hidden lg:flex items-center gap-3 mr-8">
                {session ? (
                  <div className="flex items-center gap-3">
                    {isAdmin && (
                      <Button
                        onClick={() => router.push("/create")}
                        text="Create"
                        className="navbar-button mr-3 hidden lg:flex"
                        icon={<FaPlusCircle />}
                      />
                    )}
                    <UserAvatar
                      session={session}
                      showDropdown={showDropdown}
                      handleShowDropdown={handleShowDropdown}
                      handleHideDropdown={handleHideDropdown}
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
