"use client";

import React, { useState, useEffect } from "react";
import ProfileDetails from "../_components/ProfileDetails";

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
  // console.log("getUserData called with params:", params);

  try {
    const res = await fetch(`/api/user/${params.id}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch data: ", res.status, res.statusText);
      if (res.status === 404) {
        throw new Error("User not found");
      }
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }

    const data = await res.json();
    console.log("Fetched user data: ", data);
    return data;
  } catch (error) {
    console.error("Error in getUserData:", error);
    throw error;
  }
}

interface UserProfileProps {
  params: Params;
}

const UserProfile: React.FC<UserProfileProps> = ({ params }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("useEffect fetchData called with params:", params);
      try {
        const data = await getUserData(params);
        setProfile(data);
      } catch (error: any) {
        console.error("Error fetching user data in useEffect:", error);
        setError(error.message);
      } finally {
        setLoading(false);
        console.log("useEffect fetchData completed");
      }
    };
    fetchData();
  }, [params]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        {error}
      </div>
    );
  }

  return (
    <div>{profile && <ProfileDetails profile={profile} params={params} />}</div>
  );
};

export default UserProfile;
