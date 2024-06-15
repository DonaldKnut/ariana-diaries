"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CartIcon from "./CartIcon";
import { useSession } from "next-auth/react";
import { IoIosCloseCircle } from "react-icons/io";

const links = [
  { id: 2, title: "Menu", url: "/menu" },
  { id: 4, title: "Contact", url: "/" },
];

const Menu = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <div>
      {/* LONG WAY */}
      {/* {!open ? (
        <Image
          src="/open.png"
          alt=""
          width={20}
          height={20}
          onClick={() => setOpen(true)}
        />
      ) : (
        <Image
          src="/close.png"
          alt=""
          width={20}
          height={20}
          onClick={() => setOpen(false)}
        />
      )} */}

      {/* SHORTCUT */}
      <Image
        src={open ? "/close.png" : "/open.png"}
        alt=""
        width={20}
        height={20}
        onClick={() => setOpen(!open)}
        className="cursor-pointer"
      />
      {open && (
        <div className="bg-[#7b6e34] text-white absolute left-0 top-24 w-full h-[100vh] flex flex-col gap-8 items-center justify-center text-3xl z-10">
          {links.map((item) => (
            <Link href={item.url} key={item.id} onClick={() => setOpen(false)}>
              {item.title}
            </Link>
          ))}
          {/* SHORTCUT */}
          <Link
            href={session ? "/orders" : "/login"}
            onClick={() => setOpen(false)}
          >
            {session ? "Orders" : "Login"}
          </Link>
          <Link href="/cart" onClick={() => setOpen(false)}>
            <CartIcon />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
