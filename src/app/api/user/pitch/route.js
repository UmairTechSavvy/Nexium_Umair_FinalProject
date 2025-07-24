import dbConnect from "@/dbConfig/dbConfig";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Pitch from "@/model/pitch";


const HUGGINGFACE_API_TOKEN = process.env.HUGGINGFACETOKEN 

export async function POST(req) {
  try {
    const data = await req.json();

    const { CompanyName, Idea, TargetAudience, Problem, Unique,AI_Response } = data;

       const prompt = `
Generate a complete startup pitch using the following data:
Company Name: ${CompanyName}
Idea: ${Idea}
Target Audience: ${TargetAudience}
Problem: ${Problem}
Unique Selling Point: ${Unique}
Pitch:${AI_Response}
`;

    
    const hfResponse = await fetch("https://api-inference.huggingface.co/models/google/flan-t5-large", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HUGGINGFACE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: { max_new_tokens: 200 },
      }),
    });

    const hfData = await hfResponse.json();
    const generatedPitch = hfData[0]?.generated_text || "No pitch generated.";

    await dbConnect();

    const newPitch = new Pitch({
      CompanyName,
      Idea,
      TargetAudience,
      Problem,
      Unique,
      AI_Response:generatedPitch
    });

    await newPitch.save();
    console.log(newPitch)

    return NextResponse.json({ message: "Pitch data created successfully!" ,generatedPitch},{status:200});
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
