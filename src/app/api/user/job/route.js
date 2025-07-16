import { NextResponse } from "next/server";
import dbConnect from "@/dbConfig/config";
import Job from "@/model/model";


export async function POST(req) {
  try {
    const { JobPreference, position, jobType } = await req.json();

    if (!JobPreference && !position && !jobType) {
      return NextResponse.json(
        { error: "Please provide atleast one field" },
        { status: 400 }
      );
    }
    await dbConnect();
    const newData = new Job({
      JobPreference: JobPreference,
      position: position,
      jobType: jobType,
    });

    await newData.save();

    return NextResponse.json(
      {
        message: "Job data received successfully",
        JobPreference,
        position,
        jobType,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
