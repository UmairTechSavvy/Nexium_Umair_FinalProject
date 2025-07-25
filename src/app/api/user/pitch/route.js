import dbConnect from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Pitch from "@/model/pitch";

export async function POST(req) {
  try {
    const data = await req.json();
    const { CompanyName, Idea, TargetAudience, Problem, Unique } = data;

    const prompt = `Please generate the pitch in English.
    Generate a complete startup pitch using the following data:
    Company Name: ${CompanyName}
    Idea: ${Idea}
    Target Audience: ${TargetAudience}
    Problem: ${Problem}
    Unique Selling Point: ${Unique}

    Pitch:
    `;

    const requestBody = {
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "meta-llama/Llama-3.1-8B-Instruct:novita",
    };

    console.log("Sending Request to Mistral API:", requestBody);

    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACETOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    const hfData = await response.json();
    console.log("Mistral Response:", hfData);

    if (!response.ok) {
      console.error("Mistral API Error:", hfData);
      throw new Error(`Mistral API Error: ${hfData.error || "Unknown error"}`);
    }

    let generatedPitch = "No pitch generated.";

    if (hfData.choices && hfData.choices[0]?.message?.content) {
      generatedPitch = hfData.choices[0].message.content.trim();
    } else if (hfData.error) {
      console.error("Mistral Error:", hfData.error);
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

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
