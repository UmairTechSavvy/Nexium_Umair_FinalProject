import mongoose from "mongoose";

let isConnected = false;

export default async function dbConnect() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URL);

    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected");
    });

    isConnected = true;
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw new Error("Database connection error");
  }
}

