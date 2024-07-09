import React from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import { TiWarning } from "react-icons/ti";

interface BlogActionsProps {
  blogLikes: number;
  isLiked: boolean;
  handleLike: () => void;
  blogComments: number;
  error: string | null;
}

const BlogActions: React.FC<BlogActionsProps> = ({
  blogLikes,
  isLiked,
  handleLike,
  blogComments,
  error,
}) => {
  return (
    <div className="py-12">
      <div className="flex gap-10 items-center text-xl justify-center">
        <div className="flex items-center gap-1">
          <p>{blogLikes}</p>
          {isLiked ? (
            <AiFillHeart
              onClick={handleLike}
              size={20}
              color="#ed5784"
              cursor="pointer"
            />
          ) : (
            <AiOutlineHeart onClick={handleLike} size={20} cursor="pointer" />
          )}
        </div>
        <div className="flex items-center gap-1">
          <p>{blogComments}</p>
          <AiOutlineComment size={20} />
        </div>
      </div>
      {error && (
        <div className="flex justify-center items-center gap-2 mb-4 text-red-500 text-center">
          <TiWarning />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default BlogActions;
