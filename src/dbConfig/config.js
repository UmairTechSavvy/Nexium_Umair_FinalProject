import mongoose from "mongoose";

export default function dbConnect() {
  try {
    mongoose.connect(process.env.MONDODB_URL);
    const connect = mongoose.connection;
    connect.on("connected", () => {
      console.log("Database connected successfully");
    });

    connect.on("error", () => {
      console.error("Database connection error");
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    throw new Error("Database connection failed");
  }
}
