import { NextResponse } from "next/server";
import { api } from "@/convex/_generated/api";
import { fetchMutation } from "convex/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Id } from "@/convex/_generated/dataModel";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const result = await fetchMutation(
      api.transactionsFuncs.deleteTransaction,
      {
        id: id as Id<"transactions">,
      }
    );

    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
  }

  console.log("its working");
}
