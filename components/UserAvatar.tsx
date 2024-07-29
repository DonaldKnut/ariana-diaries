import React from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { SlClose } from "react-icons/sl";
import { RiLogoutCircleFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface UserAvatarProps {
  showDropdown: boolean;
  handleShowDropdown: () => void;
  handleHideDropdown: () => void;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  showDropdown,
  handleShowDropdown,
  handleHideDropdown,
}) => {
  // Fetch the session object using useSession
  const { data: sessionData } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      // Call signOut and then clear session data and redirect to homepage
      await signOut({ redirect: false });
      // Clear any client-side session data if necessary
      localStorage.clear();
      sessionStorage.clear();
      // Redirect to homepage
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
          sessionData?.user?.avatar?.url
            ? sessionData.user.avatar.url
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
            onClick={handleSignOut}
            className="flex items-center justify-center gap-2 rounded-[8px] w-full mt-2 px-4 py-2 text-left text-white hover:bg-[#b3aa6d] transition-transform duration-300"
          >
            <RiLogoutCircleFill /> Logout
          </button>
          <Link
            onClick={handleHideDropdown}
            href={`/user/${sessionData?.user?._id}`}
            className="flex items-center justify-center gap-2 rounded-[8px] mt-2 px-4 py-2 text-left text-white hover:bg-[#b3aa6d] transition-transform duration-300"
          >
            <CgProfile /> Profile
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
