import { NextResponse } from "next/server";
import { api } from "@/convex/_generated/api";
import { fetchMutation } from "convex/nextjs";

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
        staus: 401,
      },
    });
  }
}
