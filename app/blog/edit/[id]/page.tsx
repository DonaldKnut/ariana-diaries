"use client";
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useSession } from "next-auth/react";
import Input from "../../../../components/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TextArea from "../../../../components/TextArea";
import Image from "next/image";
import { deletePhoto } from "../../../../actions/uploadActions";

interface BlogState {
  title: string;
  description: string;
  excerpt: string;
  quote: string;
  category: string;
  photo: { id?: string; url?: string };
  blogId: string;
  newImage: File | null;
}

interface EditBlogProps {
  params: {
    id: string;
  };
}

const initialState: BlogState = {
  title: "",
  description: "",
  excerpt: "",
  quote: "",
  category: "Songbirds",
  photo: {},
  blogId: "",
  newImage: null,
};

const EditBlog: React.FC<EditBlogProps> = ({ params }) => {
  const CLOUD_NAME = "dq3sduyht";
  const UPLOAD_PRESET = "nextjs_blog_images";

  const [state, setState] = useState<BlogState>(initialState);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await fetch(`/api/blog/${params.id}`);

        if (res.status === 200) {
          const blogData = await res.json();

          setState((prevstate) => ({
            ...prevstate,
            title: blogData.title,
            description: blogData.description,
            excerpt: blogData.excerpt,
            quote: blogData.quote,
            category: blogData.category,
            photo: blogData.image,
            blogId: blogData._id,
          }));
        } else {
          setError("Error fetching blog data");
        }
      } catch (error) {
        setError("Error fetching blog data");
      }
    }

    fetchBlog();
  }, [params.id]);

  if (status === "loading") {
    return <p>loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Access denied</p>;
  }

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setError("");
    const { name, value, type } = event.target;

    if (type === "file") {
      const fileInput = event.target as HTMLInputElement;
      const file = fileInput.files?.[0]; // Access files safely
      setState({ ...state, [name]: file });
    } else {
      setState({ ...state, [name]: value });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { newImage, title, category, description, excerpt, quote } = state;

    if (!title || !description || !category || !excerpt || !quote) {
      setError("Please fill out all required fields.");
      return;
    }

    if (newImage) {
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (newImage.size > maxSize) {
        setError("File size is too large. Please select a file under 5MB.");
        return;
      }
    }

    if (title.length < 4) {
      setError("Title must be at least 4 characters long.");
      return;
    }

    if (description.length < 20) {
      setError("Description must be at least 20 characters long.");
      return;
    }

    if (excerpt.length < 10) {
      setError("Excerpt must be at least 10 characters long.");
      return;
    }

    if (quote.length < 6) {
      setError("Quote must be at least 6 characters long.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      setSuccess("");

      let image;

      if (state.newImage) {
        image = await uploadImage();

        if (state.photo?.id) {
          await deletePhoto(state.photo.id);
        }
      } else {
        image = state.photo;
      }

      const updateBlog = {
        title,
        description,
        excerpt,
        quote,
        category,
        image,
        authorId: session?.user?._id,
      };

      const response = await fetch(`/api/blog/${params.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        method: "PUT",
        body: JSON.stringify(updateBlog),
      });

      if (response?.status === 200) {
        setSuccess("Blog updated successfully.");
        setTimeout(() => {
          router.push(`/blog/${params.id}`); // Use router.push instead of router.refresh
        }, 1500);
      } else {
        setError("Error occurred while updating blog.");
      }
    } catch (error) {
      console.log(error);
      setError("Error occurred while updating blog.");
    }

    setIsLoading(false);
  };

  const uploadImage = async () => {
    if (!state.newImage) return;

    const formdata = new FormData();

    formdata.append("file", state.newImage);
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

  const handleCancelUploadImg = () => {
    setState({ ...state, newImage: null }); // Corrected typo in cancel function name
  };

  return (
    <section className="container max-w-3xl">
      <h2 className="mb-5">
        <span className="special-word">Edit</span> Blog
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Title"
          type="text"
          name="title"
          placeholder="Write your title here..."
          onChange={handleChange}
          value={state.title}
        />

        <TextArea
          label="Description"
          rows={4}
          name="description"
          placeholder="Write your description here..."
          onChange={handleChange}
          value={state.description}
        />

        <TextArea
          label="Excerpt"
          rows={2}
          name="excerpt"
          placeholder="Write your excerpt here..."
          onChange={handleChange}
          value={state.excerpt}
        />

        <TextArea
          label="Quote"
          rows={2}
          name="quote"
          placeholder="Write your quote here..."
          onChange={handleChange}
          value={state.quote}
        />

        <div>
          <label className="block">Select an option</label>
          <select
            name="category"
            onChange={handleChange}
            value={state.category}
            className="block rounded-lg w-full p-3 bg-primaryColorLight"
          >
            <option value="Songbirds">Songbirds</option>
            <option value="Waterfowl">Waterfowl</option>
            <option value="Parrots">Parrots</option>
            <option value="Seabirds">Seabirds</option>
            <option value="Gamebirds">Gamebirds</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Upload Image</label>

          <input
            onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement>)} // Type assertion for file input
            type="file"
            name="newImage"
            accept="image/*"
          />

          {state.newImage ? (
            <div>
              <Image
                src={URL.createObjectURL(state.newImage)}
                priority
                alt="Sample image"
                width={320}
                height={180}
                sizes="100vw"
                className="w-32 mt-5"
              />
              <button onClick={handleCancelUploadImg}>Cancel</button>{" "}
              {/* Fixed typo in cancel button */}
            </div>
          ) : (
            <div>
              {state.photo && state.photo.url && (
                <div>
                  <Image
                    src={state.photo.url}
                    priority
                    alt="Sample image"
                    width={320}
                    height={180}
                    sizes="100vw"
                    className="w-32 mt-5"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {error && <div className="text-red-700">{error}</div>}

        {success && <div className="text-green-700">{success}</div>}

        <button type="submit" className="btn">
          {isLoading ? "Loading..." : "Edit"}
        </button>
      </form>
    </section>
  );
};

export default EditBlog;
