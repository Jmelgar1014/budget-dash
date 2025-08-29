import { NextResponse } from "next/server";
import { api } from "@/convex/_generated/api";
import { fetchMutation,fetchQuery } from "convex/nextjs";



export async function POST(req: Request) {
  const json = await req.json();
  console.log("testing new mac")

  try {
    await fetchMutation(api.transactionsFuncs.addTransaction, json);
    return NextResponse.json({
      Success: {
        message: "Submission was successful",
        status: 200,
      },
    });
  } catch (error) {
    return NextResponse.json({
      error: {
        message: `${error}`,
        status: 401,
      },
    });
  }
}

export async function GET(req:Request){
 

  try{
    const data = await fetchQuery(api.transactionsFuncs.getTransactions)
    
    return NextResponse.json(data)
  }catch(error){
    return NextResponse.json({
      error:{
        message: error, status:401
      }
    })
  }


}
