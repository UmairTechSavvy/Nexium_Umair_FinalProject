import dbConnect from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Pitch from "@/model/pitch";



export async function POST(req) {
  try {
    const data = await req.json();
    const { CompanyName, Idea, TargetAudience, Problem, Unique } = data;

    const prompt = `
Generate a complete startup pitch using the following data:
Company Name: ${CompanyName}
Idea: ${Idea}
Target Audience: ${TargetAudience}
Problem: ${Problem}
Unique Selling Point: ${Unique}

Pitch:
`;

    const hfResponse = await fetch("https://api-inference.huggingface.co/models/google/flan-t5-large", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACETOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: { max_new_tokens: 200 },
      }),
    });

    const hfData = await hfResponse.json();

    let generatedPitch = "No pitch generated.";
    if (Array.isArray(hfData) && hfData[0]?.generated_text) {
      generatedPitch = hfData[0].generated_text;
    } else if (hfData.error) {
      console.error("Hugging Face Error:", hfData.error);
      throw new Error(hfData.error);
    }

    await dbConnect();

    const newPitch = new Pitch({
      CompanyName,
      Idea,
      TargetAudience,
      Problem,
      Unique,
      AI_Response: generatedPitch,
    });

    await newPitch.save();

    return NextResponse.json(
      { message: "Pitch data created successfully!", generatedPitch },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
