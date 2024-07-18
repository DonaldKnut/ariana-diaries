import React from "react";
import Image from "next/image";
import Link from "next/link";

interface AuthorDetailsProps {
  author: {
    _id: string;
    name: string;
    designation: string;
    avatar: {
      url: string;
    };
  };
}

const AuthorDetails: React.FC<AuthorDetailsProps> = ({ author }) => {
  if (!author || !author._id) {
    // If author or author._id is undefined or null, return null or handle gracefully
    return null; // or handle with a placeholder or loading state
  }

  return (
    <Link href={`/user/${author._id.toString()}`}>
      <div className="flex flex-col justify-center items-center py-10">
        <Image
          src="/miss_oluwole.png"
          alt="avatar image"
          width={80}
          height={80}
          className="rounded-full"
        />
        <div className="text-center mt-2">
          {/* <p className="text-whiteColor">{author.name}</p> */}
          <p className="text-whiteColor">Ariana</p>
          <p>CEO Ariana Diaries</p>
        </div>
      </div>
    </Link>
  );
};

export default AuthorDetails;
