// UserAvatar.tsx

import React from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { SlClose } from "react-icons/sl";
import { RiLogoutCircleFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import "./UserAvatar.css";

interface UserAvatarProps {
  session: Session; // Added session here
  showDropdown: boolean;
  handleShowDropdown: () => void;
  handleHideDropdown: () => void;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  session,
  showDropdown,
  handleShowDropdown,
  handleHideDropdown,
}) => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      localStorage.clear();
      sessionStorage.clear();
      router.push("/");
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
    handleHideDropdown();
  };

  return (
    <div className="relative avatar-dropdown">
      <Image
        onClick={handleShowDropdown}
        src={
          session?.user?.avatar?.url
            ? session.user.avatar.url
            : "/ariana-login-image.png"
        }
        alt="avatar"
        width={50}
        height={50}
        className="rounded-full cursor-pointer avatar-img"
      />
      {showDropdown && (
        <div className="absolute top-12 right-0 p-5 rounded-md shadow-lg z-[1000] mt-2 dropdown-content">
          <SlClose
            onClick={handleHideDropdown}
            className="w-full cursor-pointer close-icon"
          />
          <button
            onClick={handleSignOut}
            className="flex items-center justify-center gap-2 rounded-[8px] w-full mt-2 px-4 py-2 text-left text-white logout-btn"
          >
            <RiLogoutCircleFill /> Logout
          </button>
          <Link
            onClick={handleHideDropdown}
            href={`/user/${session?.user?._id}`}
            className="flex items-center justify-center gap-2 rounded-[8px] mt-2 px-4 py-2 text-left text-white profile-link"
          >
            <CgProfile /> Profile
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
