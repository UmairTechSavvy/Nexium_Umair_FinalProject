import dbConnect from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Pitch from "@/model/pitch";

// This function handles the POST request
export async function POST(req) {
  try {
    // Parse the incoming data from the request
    const data = await req.json();
    const { CompanyName, Idea, TargetAudience, Problem, Unique } = data;

    // Construct the prompt for generating the pitch
    const prompt = `Please generate the pitch in English.
    Generate a complete startup pitch using the following data:
    Company Name: ${CompanyName}
    Idea: ${Idea}
    Target Audience: ${TargetAudience}
    Problem: ${Problem}
    Unique Selling Point: ${Unique}

    Pitch:
    `;

    // Create request body for Mistral model (adjusting structure for chat API)
    const requestBody = {
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "meta-llama/Llama-3.1-8B-Instruct:novita", // Replace this with the desired model
    };

    console.log("Sending Request to Mistral API:", requestBody);

    // Make a POST request to the Mistral model API on Hugging Face
    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions", // Correct endpoint for the chat API
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACETOKEN}`, // Use your Hugging Face API token
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody), // Send the request body
      }
    );

    // Parse the response data from Mistral API
    const hfData = await response.json();
    console.log("Mistral Response:", hfData);

    // Check if the response is successful
    if (!response.ok) {
      console.error("Mistral API Error:", hfData);
      throw new Error(`Mistral API Error: ${hfData.error || 'Unknown error'}`);
    }

    // Initialize the generated pitch
    let generatedPitch = "No pitch generated.";

    // Extract the generated pitch from the response
    if (hfData.choices && hfData.choices[0]?.message?.content) {
      generatedPitch = hfData.choices[0].message.content.trim();
    } else if (hfData.error) {
      console.error("Mistral Error:", hfData.error);
      throw new Error(hfData.error);
    }

    // Connect to the database
    await dbConnect();

    // Save the generated pitch to the database
    const newPitch = new Pitch({
      CompanyName,
      Idea,
      TargetAudience,
      Problem,
      Unique,
      AI_Response: generatedPitch,
    });

    await newPitch.save();

    // Respond with the generated pitch
    return NextResponse.json(
      { message: "Pitch data created successfully!", generatedPitch },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server Error:", error);
    // Return a generic error message for server errors
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
