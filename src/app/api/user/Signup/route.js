import User from "@/model/model.js";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import dbConnect from "@/dbConfig/dbConfig.js";

export async function POST(req) {
  try {
    // Manually set CORS headers
    const res = NextResponse.next();
    res.headers.set("Access-Control-Allow-Origin", "*");  // Allow all origins (change this in production)
    res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // Connect to the database
    await dbConnect();
    
    const body = await req.json();
    console.log("Received data:", body); // Logging received data for debugging

    const { Username, Password, Email } = body;

    // Validate required fields
    if (!Username || !Password || !Email) {
      console.log("Missing required fields");
      return NextResponse.json(
        { error: "All fields (Username, Email, Password) are required." },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
      console.log("Invalid email format");
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      console.log("User already exists");
      return NextResponse.json(
        { error: "User already exists with this email." },
        { status: 400 }
      );
    }

    // Hash the password
    const salted = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(Password, salted);

    // Create a new user
    const newUser = await User.create({
      Username,
      Email,
      Password: hashedPassword,
    });

    console.log("User created successfully:", newUser); // Logging successful user creation

    return NextResponse.json(
      { message: "User created successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during user signup:", error); // Enhanced error logging
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
