import dbConnect from "@/dbConfig/dbConfig";
import User from "@/model/model";
import { NextResponse } from "next/server";
import Bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"; 


export async function POST(req) {
  try {
    await dbConnect()
    const body = await req.json();
    const { Email, Password } = body;

    if (!Email || !Password) {
      return NextResponse.json(
        { error: "Email and Password are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ Email });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const checkingPassword = await Bcryptjs.compare(Password, user.Password);
    if (!checkingPassword)
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );

    const tokenData = {
      id: user._id,
      Email: user.Email,
      Password: user.Password,
    };

    const token =  jwt.sign(
      tokenData,
      process.env.tokendata,
      { expiresIn: "1h" }
    );
    const response = NextResponse.json(
      { message: "Login successful", token },
      { status: 200 }
    );
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
