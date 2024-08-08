import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MenuItem, SubMenuItem } from "../utils/types";
import { CgChevronDownO } from "react-icons/cg";
import { signOut, useSession } from "next-auth/react";
import { FaCirclePlus } from "react-icons/fa6";
import { PiSignOutDuotone } from "react-icons/pi";
import { IoLogIn } from "react-icons/io5";

interface NavbarMenuProps {
  menuItems: MenuItem[];
  activeSubmenu: string | null;
  toggleActiveSubmenu: (itemId: string) => void;
  isAdmin: boolean;
  navbarOpen: boolean;
}

const NavbarMenu: React.FC<NavbarMenuProps> = ({
  menuItems,
  activeSubmenu,
  toggleActiveSubmenu,
  isAdmin,
  navbarOpen,
}) => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
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
              }}
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
                  <li key={subItem.id} className="mt-2 flex items-center">
                    {(subItem.id !== "add" || isAdmin) && (
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
            {isAdmin && (
              <li className="mt-5 mb-5 font-bold text-xl lg:hidden">
                <Link
                  href="/create"
                  className="flex items-center gap-2 w-full px-4 py-2 text-xl rounded-[9px] z-[1000] text-white hover:bg-[#b3aa6d] transition-transform duration-300"
                >
                  Create <FaCirclePlus />
                </Link>
              </li>
            )}
            <li className="mt-5 mb-5 font-bold text-xl lg:hidden">
              <button
                onClick={() => {
                  signOut();
                  router.push("/");
                }}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm rounded-[9px] z-[1000] text-white hover:bg-[#b3aa6d] transition-transform duration-300"
              >
                Logout <PiSignOutDuotone />
              </button>
            </li>
          </>
        ) : (
          <li className="mt-5 mb-5 font-bold text-xl lg:hidden">
            <Link
              href="/auth/login"
              className="flex items-center gap-2 w-full px-4 py-2 textxl rounded-[9px] z-[1000] text-white hover:bg-[#b3aa6d] transition-transform duration-300"
            >
              Login <IoLogIn />
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavbarMenu;
