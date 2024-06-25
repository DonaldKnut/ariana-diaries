import UserModel, { UserDocument } from "../models/User";
import { connect } from "../database/index";

export async function getUserByEmail(
  email: string
): Promise<UserDocument | null> {
  await connect();
  return UserModel.findOne({ email }).exec();
}

export async function updateUserPassword(
  email: string,
  hashedPassword: string
): Promise<void> {
  await connect();
  await UserModel.updateOne({ email }, { password: hashedPassword }).exec();
}
