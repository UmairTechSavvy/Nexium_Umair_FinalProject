import User from "@/model/model";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log(body);
    if (!body.Username || !body.Email || !body.Password) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }
    if (!/^[a-zA-Z0-9]+$/.test(body.Username)) {
      return NextResponse.json(
        { error: "Username can only contain letters and numbers." },
        { status: 400 }
      );
    }
    if (!body.Username && !body.Email && !body.Password) {
      return NextResponse.json(
        { error: "Please fill in all fields." },
        { status: 400 }
      );
    }
    const { Username, Password, Email } = body;

    const existingUser = await User.findOne({ Email: Email });
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

    await newUser.save();

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

