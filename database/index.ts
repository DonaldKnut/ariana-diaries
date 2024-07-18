import mongoose from "mongoose";

let isConnected = false; // This is a boolean to track connection status

export async function connect() {
  const mongodbUrl = process.env.MONGODB_URL;
  if (!mongodbUrl) {
    throw new Error("MongoDB URL is not defined in environment variables.");
  }

  if (isConnected) {
    console.log("Using existing database connection.");
    return mongoose.connection;
  }

  try {
    const db = await mongoose.connect(mongodbUrl);
    isConnected = mongoose.connection.readyState === 1; // Ensure this is boolean
    console.log("MongoDB connected successfully");

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}
