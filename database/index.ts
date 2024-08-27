import mongoose from "mongoose";
import { Db } from "mongodb";

let isConnected = false; // Track connection status

export async function connect(): Promise<{ db: Db }> {
  const mongodbUrl = process.env.MONGODB_URL;
  if (!mongodbUrl) {
    throw new Error("MongoDB URL is not defined in environment variables.");
  }

  if (isConnected) {
    console.log("Using existing database connection.");
    const db = mongoose.connection.db as unknown as Db;
    if (!db) {
      throw new Error(
        "MongoDB connection is established, but the database instance is undefined."
      );
    }
    return { db };
  }

  try {
    const connection = await mongoose.connect(mongodbUrl);
    isConnected = connection.connection.readyState === 1; // Ensure this is boolean
    console.log("MongoDB connected successfully");

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    const db = mongoose.connection.db as unknown as Db;
    if (!db) {
      throw new Error(
        "MongoDB connection is established, but the database instance is undefined."
      );
    }

    return { db };
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}
