import { headers } from "next/headers";
import { NextResponse } from "next/server";
import axios from "axios";




export async function POST (req){

  try {

    const data = await req.json()

const res = await axios.post("http://localhost:5678/webhook-test/job",data,{

  headers:{

'Content-Type': 'application/json',

  }
  })
return NextResponse.json({

  message: "Data send successfully",


})


    
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
    
  }




}