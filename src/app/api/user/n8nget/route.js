
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await axios.get("http://localhost:5678/webhook-test/get-jobs");

    console.log("Full response from n8n:", res.data);

    if (!res.data || Object.keys(res.data).length === 0) {
      console.warn("No data returned from n8n");
      return NextResponse.json({ error: "No data found" }, { status: 404 });
    }

    return NextResponse.json(res.data, { status: 200 });

  } catch (error) {
    console.error("ERROR in GET /n8nget route");
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);
    console.error("Response:", error.response?.data);
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}
