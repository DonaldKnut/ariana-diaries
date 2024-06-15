"use client";
import Button from "../../button";
import { Blog } from "../../../utils/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";

export default function BlogDetailsHome({ blogData }: { blogData: Blog }) {
  console.log(blogData, "blogData");

  const [comment, setComment] = useState<string>("");
  const { data: session } = useSession();
  const router = useRouter();

  async function handleCommentSave() {
    if (!blogData || !blogData.id) return; // Ensure blogData is defined

    let extractComments = [...blogData.comments];

    extractComments.push(`${comment}|${session?.user?.name}`);

    const response = await fetch(`/api/blog-post/update-post`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: blogData.id,
        comments: extractComments,
      }),
    });

    const data = await response.json();

    console.log(data, "comment123");

    if (data && data.success) {
      setComment("");
      router.refresh();
    }
  }

  useEffect(() => {
    let interval = setInterval(() => {
      router.refresh();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!blogData) return null;

  // Function to get first name or last name from full name
  const getUserName = () => {
    if (!session?.user?.name) return "Unknown Author";

    const fullName = session.user.name;
    const names = fullName.split(" ");
    return names.length > 0 ? names[0] : "Unknown Author"; // Display first name
    // return names.length > 1 ? names[names.length - 1] : "Unknown Author"; // Display last name
  };

  return (
    <>
      <section className="pt-[150px] pb-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-col gap-4 items-center justify-center">
            <div className="w-full px-4 lg:w-8/12">
              <div>
                <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl">
                  {blogData?.title}
                </h2>
                <div className="mb-10 flex flex-wrap items-center justify-between border-b border-body-color border-opacity-10 pb-4 dark:border-white dark:border-opacity-10">
                  <div className="flex flex-wrap items-center">
                    <div className="mr-10 mb-5 flex items-center">
                      <div className="mr-4">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full">
                          {session && blogData?.userimage ? (
                            <Image src={blogData.userimage} alt="User" fill />
                          ) : (
                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#ab9b6a] text-white text-lg">
                              {session?.user?.email
                                ? session.user.email.charAt(0).toUpperCase()
                                : ""}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="w-full">
                        <h4 className="mb-1 text-base font-medium text-body-color">
                          By
                          <span className="pl-2">{getUserName()}</span>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="mb-5">
                    <Link
                      className="inline-flex items-center justify-center rounded-full bg-[#ab9b6a] py-2 px-4 text-sm font-semibold text-white"
                      href={`/category/${blogData?.category}`}
                    >
                      {blogData?.category}
                    </Link>
                  </div>
                </div>
                <div>
                  <div className="mb-10 w-full overflow-hidden rounded">
                    <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                      <Image
                        src={blogData?.image || ""}
                        alt="Blog"
                        className="object-cover object-center"
                        fill
                      />
                    </div>
                  </div>
                  <div
                    className="mb-8 leading-relaxed text-base font-medium text-body-color sm:text-lg lg:text-base xl:text-lg"
                    dangerouslySetInnerHTML={{ __html: blogData?.content }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-8/12 flex gap-4">
              {session !== null ? (
                <>
                  <input
                    name="comment"
                    id="comment"
                    autoFocus
                    autoComplete="off"
                    placeholder="Add comment here"
                    value={comment}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setComment(event.target.value)
                    }
                    className="w-full pl-[12px] pr-[12px] rounded-md border border-transparent py-3 px-6 text-[#605020] bg-[#939089d0] placeholder-[#534817] shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#d7cb83] dark:shadow-signUp"
                  />
                  <Button
                    text="Add"
                    onClick={handleCommentSave}
                    icon={<IoIosAddCircle />}
                  />
                </>
              ) : null}
            </div>
            <section className="py-8 lg:py-16 w-full lg:w-8/12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg lg:text-2xl font-bold text-black dark:text-white">
                  Discussion ({blogData?.comments.length})
                </h2>
              </div>
              {blogData && blogData.comments && blogData.comments.length > 0
                ? blogData.comments.map((comment) => (
                    <div className="p-6 text-base rounded-lg bg-[#6f6a45] mb-3">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <p className="inline-flex items-center mr-3 text-sm text-[#664a19] dark:text-white font-semibold">
                            {comment.split("|")[1] === blogData?.userid
                              ? `${
                                  comment.split("|")[1].split("_")[0]
                                } (Author)`
                              : comment.split("|")[1].split("_")[0]}
                          </p>
                        </div>
                      </div>
                      <p className="text-[#d1ae39] dark:text-gray-400">
                        {comment.split("|")[0]}
                      </p>
                    </div>
                  ))
                : null}
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
