import mongoose from "mongoose";

export async function connect() {
  const mongodbUrl = process.env.MONGODB_URL;
  if (!mongodbUrl) {
    throw new Error("MongoDB URL is not defined in environment variables.");
  }

  if (mongoose.connection.readyState === 1) {
    // If the connection is already established, return the connection
    return mongoose.connection;
  }

  await mongoose.connect(mongodbUrl);

  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected successfully");
  });

  mongoose.connection.on("error", (err) => {
    console.error(
      "MongoDB connection error. Please make sure MongoDB is running. " + err
    );
    process.exit(1); // Exit with non-zero code to indicate failure
  });

  return mongoose.connection;
}
