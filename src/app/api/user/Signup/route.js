import User from "@/model/model.js";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import dbConnect from "@/dbConfig/dbConfig.js";

export async function POST(req) {
  try {
    
    const res = NextResponse.next();
    res.headers.set("Access-Control-Allow-Origin", "*");  
    res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

   
    await dbConnect();
    
    const body = await req.json();
    console.log("Received data:", body); 

    const { Username, Password, Email } = body;

    
    if (!Username || !Password || !Email) {
      console.log("Missing required fields");
      return NextResponse.json(
        { error: "All fields (Username, Email, Password) are required." },
        { status: 400 }
      );
    }

 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
      console.log("Invalid email format");
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 }
      );
    }

   
    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      console.log("User already exists");
      return NextResponse.json(
        { error: "User already exists with this email." },
        { status: 400 }
      );
    }

   
    const salted = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(Password, salted);

    const newUser = await User.create({
      Username,
      Email,
      Password: hashedPassword,
    });

    console.log("User created successfully:", newUser); 

    return NextResponse.json(
      { message: "User created successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during user signup:", error); 
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
