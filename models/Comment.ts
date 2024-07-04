import mongoose, { Schema, Document, Model } from "mongoose";

export interface IComment extends Document {
  post: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  text: string;
  date: Date;
}

const CommentSchema: Schema = new Schema(
  {
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Comment: Model<IComment> =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;
