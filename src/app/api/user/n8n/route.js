import { headers } from "next/headers";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  try {
    const data = await req.json();
 
    if(!data || Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: "No data provided" },
        { status: 400 }
      );
    }
console.log("Data received:", data);
    const res = await axios.post(
      "http://localhost:5678/webhook-test/job",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Response from n8n:", res.data);
    return NextResponse.json({
      message: "Data send successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

