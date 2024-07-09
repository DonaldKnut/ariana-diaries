import React from "react";
import Image from "next/image";
import { BsTrash } from "react-icons/bs";

interface CommentProps {
  comment: {
    _id: string;
    text: string;
    user: {
      _id: string;
      name: string;
      avatar: {
        url: string;
      };
    };
  };
  sessionUserId: string;
  handleDeleteComment: (commentId: string) => void;
}

const Comment: React.FC<CommentProps> = ({
  comment,
  sessionUserId,
  handleDeleteComment,
}) => {
  return (
    <div key={comment._id} className="flex gap-3 py-5 items-center">
      <Image
        src={
          comment?.user?.avatar?.url
            ? comment?.user?.avatar?.url
            : "/ariana-login-image.png"
        }
        alt="avatar image"
        width={0}
        height={0}
        sizes="100vw"
        className="w-10 h-10 rounded-full"
      />
      <div>
        <p className="text-whiteColor">{comment?.user?.name}</p>
        <p>{comment.text}</p>
      </div>
      {sessionUserId === comment?.user?._id && (
        <BsTrash
          onClick={() => handleDeleteComment(comment._id)}
          cursor="pointer"
          className="text-red-500 ml-10"
        />
      )}
    </div>
  );
};

export default Comment;
