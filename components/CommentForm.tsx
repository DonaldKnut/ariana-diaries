import React from "react";

interface CommentFormProps {
  commentText: string;
  setCommentText: (value: string) => void;
  handleCommentSubmit: (e: React.FormEvent) => void;
  isCommenting: boolean;
}

const CommentForm: React.FC<CommentFormProps> = ({
  commentText,
  setCommentText,
  handleCommentSubmit,
  isCommenting,
}) => {
  return (
    <form onSubmit={handleCommentSubmit} className="space-y-2">
      <input
        onChange={(e) => setCommentText(e.target.value)}
        value={commentText}
        name="comment"
        type="text"
        placeholder="Type message..."
        className="w-full px-3 py-2 rounded-lg shadow-sm border focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-[#4f4833] dark:text-white"
      />
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-[#998304] rounded-lg shadow-sm hover:bg-[#9a8f54] transition duration-200"
        disabled={isCommenting}
      >
        {isCommenting ? "Loading..." : "Comment"}
      </button>
    </form>
  );
};

export default CommentForm;
