import mongoose, { Document, Model } from "mongoose";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  designation: string;
  avatar: object;
  age: string;
  location: string;
  about: string;
}

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      default: "",
    },
    avatar: {
      type: Object,
      default: {},
    },
    age: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    about: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const UserModel: Model<UserDocument> =
  mongoose.models.User || mongoose.model<UserDocument>("User", UserSchema);

export default UserModel;
