import React from "react";
import ProfileDetails from "./ProfileDetails";

interface Params {
  id: string;
}

interface Profile {
  _id: string;
  name: string;
  email: string;
  about: string;
  designation: string;
  age: number;
  location: string;
  avatar?: {
    id: string;
    url: string;
  };
  createdAt: string;
}

async function getUserData(params: Params): Promise<Profile> {
  const res = await fetch(`http://localhost:3000/api/user/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

interface UserProfileProps {
  params: Params;
}

const UserProfile: React.FC<UserProfileProps> = async ({ params }) => {
  const profile = await getUserData(params);
  return (
    <div>
      <ProfileDetails profile={profile} params={params} />
    </div>
  );
};

export default UserProfile;
