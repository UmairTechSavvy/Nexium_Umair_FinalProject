import User from "@/model/model.js";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import dbConnect from "@/dbConfig/dbConfig.js";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    console.log(body);

    const { Username, Password, Email } = body;

    const existingUser = await User.findOne({ Email });
    if (existingUser) {
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

    console.log(newUser);

    return NextResponse.json(
      { message: "User created successfully." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}

/*export async function GET() {
  try {
    await dbConnect()
    const user = await User.findOne(); 

    if (!user) {
      return NextResponse.json({ error: "No user found" }, { status: 404 });
    }

    return NextResponse.json({
      username: user.username,
      email: user.email,
      role: user.role || "user", 
    });
  } catch (error) {
    console.error("GET /signup error:", error);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}
*/
