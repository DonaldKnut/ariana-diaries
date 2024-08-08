"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { MdCancel } from "react-icons/md";
import Image from "next/image";
import moment from "moment";
import Modal from "../../../components/Modal";
import { deletePhoto } from "../../../actions/uploadActions";
import Input from "../../../components/Input";
import { AiOutlineClose } from "react-icons/ai";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { RiFileEditFill } from "react-icons/ri";
import { IoIosCloudUpload } from "react-icons/io";
import { SiGmail } from "react-icons/si";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { BsInfoCircleFill } from "react-icons/bs";
import { FaBabyCarriage } from "react-icons/fa6";
import { ImLocation2 } from "react-icons/im";
import { LiaUserEditSolid } from "react-icons/lia";

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

interface ProfileDetailsProps {
  profile: Profile;
  params: {
    id: string;
  };
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ profile, params }) => {
  const CLOUD_NAME = "dtujpq8po";
  const UPLOAD_PRESET = "ariana_diaries";

  const [profileToEdit, setProfileToEdit] = useState<Profile>(profile);
  const [avatarToEdit, setAvatarToEdit] = useState<File | null>(null);

  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isDeleting, setIsDeleting] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter();

  const handleEditSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const { name, about, designation, age, location } = profileToEdit;

    if (!name) {
      setError("Name is required.");
      return;
    }

    if (avatarToEdit) {
      const maxSize = 2 * 1024 * 1024; // 2MB in bytes
      if (avatarToEdit.size > maxSize) {
        setError("File size is too large. Please select a file under 2MB.");
        return;
      }
    }

    try {
      setIsLoading(true);
      setError("");
      setSuccess("");

      let profileImg;

      if (avatarToEdit) {
        profileImg = await uploadImage();

        if (profile?.avatar?.id) {
          await deletePhoto(profile?.avatar?.id);
        }
      } else {
        profileImg = profile?.avatar;
      }

      const updateUser = {
        name,
        about,
        designation,
        age,
        location,
        avatar: profileImg,
      };

      const response = await fetch(`/api/user/${params.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        method: "PATCH",
        body: JSON.stringify(updateUser),
      });

      if (response?.status === 200) {
        setSuccess("User updated successfully.");
      } else {
        setError("Error occurred while updating user.");
      }
    } catch (error) {
      console.log(error);
      setError("Error occurred while updating user.");
    } finally {
      setSuccess("");
      setError("");
      setIsLoading(false);
      setOpenModalEdit(false);
      setAvatarToEdit(null);
      router.refresh();
    }
  };

  const uploadImage = async () => {
    if (!avatarToEdit) return;

    const formdata = new FormData();

    formdata.append("file", avatarToEdit);
    formdata.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formdata,
        }
      );

      const data = await res.json();
      const image = {
        id: data["public_id"],
        url: data["secure_url"],
      };

      return image;
    } catch (error) {
      console.log(error);
    }
  };

  const timeFormat = () => {
    const timeStr = profile?.createdAt;
    const time = moment(timeStr);
    const formattedTime = time.format("MMMM Do YYYY");

    return formattedTime;
  };

  const handleCancelUploadImage = () => {
    setAvatarToEdit(null);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError("");
    const { name, value, type, files } = event.target;

    if (type === "file" && files) {
      setAvatarToEdit(files[0]);
    } else {
      setProfileToEdit((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  if (!profile) {
    return <p>Access Denied.</p>;
  }

  return (
    <div className="p-6 my-8 mx-auto max-w-7xl">
      <div className="text-center pb-10">
        <h2 className="text-4xl font-bold">Profile</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1 space-y-5">
          <h4 className="text-2xl font-semibold flex items-center gap-2">
            <BsInfoCircleFill />
            About Me
          </h4>
          <p className="text-lg">{profile?.about}</p>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <Image
            src={profile?.avatar?.url || "/ariana_login-image.png"}
            alt="avatar"
            width={160}
            height={160}
            className="w-40 h-40 rounded-full border-4 border-gray-300"
          />
        </div>

        <div className="flex-1 space-y-5">
          <h4 className="text-2xl font-semibold flex items-center gap-2">
            <BiSolidMessageSquareDetail /> Details
          </h4>

          <div className="space-y-1">
            <p className="font-medium flex items-center gap-2">
              <SiGmail />
              Email:
            </p>
            <p>{profile?.email}</p>
          </div>

          <div className="space-y-1">
            <p className="font-medium flex items-center gap-2">
              <FaRegCircleUser />
              Name:
            </p>
            <p>{profile?.name}</p>
          </div>

          <div className="space-y-1">
            <p className="font-medium flex items-center gap-2">
              <FaBabyCarriage />
              Age:
            </p>
            <p>{profile?.age}</p>
          </div>

          <div className="space-y-1">
            <p className="font-medium flex items-center gap-2">
              <ImLocation2 />
              Location:
            </p>
            <p>{profile?.location}</p>
          </div>

          <div className="space-y-1">
            <p className="font-medium flex items-center gap-2">
              <MdOutlineAccessTimeFilled />
              Joined:
            </p>
            <p>{timeFormat()}</p>
          </div>
        </div>
      </div>

      <div className="pt-10 text-center text-[#fff]">
        {profile?._id === session?.user?._id && (
          <button
            className="bg-yellow-700 text-yellow-200 flex items-center justify-center gap-2 py-2 px-5 rounded-md hover:bg-yellow-800"
            onClick={() => setOpenModalEdit(true)}
          >
            Edit <RiFileEditFill className="text-lg" />
          </button>
        )}

        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form className="w-full space-y-6" onSubmit={handleEditSubmit}>
            <h2 className="text-3xl text-primaryColor font-semibold pb-5">
              Edit Profile
            </h2>

            {avatarToEdit ? (
              <div className="flex justify-center items-start space-x-2">
                <Image
                  src={URL.createObjectURL(avatarToEdit)}
                  alt="avatar"
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full border-2 border-gray-300"
                />

                <button
                  type="button"
                  className="text-red-500"
                  onClick={handleCancelUploadImage}
                >
                  <AiOutlineClose />
                </button>
              </div>
            ) : (
              <div className="flex justify-center">
                {profile?.avatar && profile?.avatar["url"] && (
                  <Image
                    src={profile?.avatar?.url}
                    alt="avatar"
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full border-2 border-gray-300"
                  />
                )}
              </div>
            )}
            <IoIosCloudUpload size={50} />

            <div>
              <input
                onChange={handleChange}
                type="file"
                name="newImage"
                accept="image/*"
                className="block w-full text-sm text-[#fff] border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
              />
            </div>

            <Input
              name="name"
              type="text"
              placeholder="Name"
              label="Name"
              value={profileToEdit?.name || ""}
              onChange={handleChange}
            />

            <Input
              name="designation"
              type="text"
              placeholder="Designation"
              label="Designation"
              value={profileToEdit?.designation || ""}
              onChange={handleChange}
            />

            <Input
              name="about"
              type="text"
              placeholder="About"
              label="About"
              value={profileToEdit?.about || ""}
              onChange={handleChange}
            />

            <Input
              name="age"
              type="number"
              placeholder="Age"
              label="Age"
              value={profileToEdit?.age.toString() || ""}
              onChange={handleChange}
            />

            <Input
              name="location"
              type="text"
              placeholder="Location"
              label="Location"
              value={profileToEdit?.location || ""}
              onChange={handleChange}
            />

            {error && <div className="text-red-700">{error}</div>}

            {success && <div className="text-green-700">{success}</div>}

            <div className="flex justify-end space-x-5">
              <button
                type="submit"
                className="btn bg-[#393608] text-white py-2 px-5 rounded-md hover:bg-[#8b7b14] flex items-center gap-2"
              >
                {isLoading ? "Loading..." : "Update"} <LiaUserEditSolid />
              </button>

              <button
                type="button"
                className="btn bg-red-700 text-white py-2 px-5 rounded-md hover:bg-red-800 flex items-center gap-2"
                onClick={() => setOpenModalEdit(false)}
              >
                Cancel <MdCancel />
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default ProfileDetails;
