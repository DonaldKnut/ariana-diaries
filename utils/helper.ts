import mongoose, { ObjectId } from "mongoose";
import { verifyJwtToken } from "../lib/jwt";
import Post from "../models/Post";
import Comment, { IComment } from "../models/Comment";

export const connectToDatabase = async () => {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGODB_URI || "");
  }
};

export const verifyToken = (accessToken: string) => {
  const decodedToken = verifyJwtToken(accessToken);
  if (!decodedToken) {
    throw new Error("unauthorized (wrong or expired token)");
  }
  return decodedToken;
};

export const findPostById = async (postId: string) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error("Post not found");
  }
  return post;
};

export const createComment = async (
  postId: ObjectId,
  userId: ObjectId,
  text: string
) => {
  const newComment = new Comment({
    post: postId,
    user: userId,
    text,
    date: new Date(),
  });

  const savedComment = await newComment.save();
  return savedComment;
};

export const deleteCommentById = async (commentId: ObjectId) => {
  const deletedComment = await Comment.findByIdAndDelete(commentId);
  if (!deletedComment) {
    throw new Error("Comment not found");
  }
  return deletedComment;
};
