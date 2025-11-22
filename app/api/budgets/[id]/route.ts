import { NextResponse } from "next/server";
import { api } from "@/convex/_generated/api";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { Id } from "@/convex/_generated/dataModel";
import { rateLimit } from "@/utilities/rateLimit";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { success, limit, remaining } = await rateLimit.limit(userId);

  if (!success) {
    return NextResponse.json(
      {
        error: "Rate Limit Exceeded",
        limit,
        remaining,
        reset: new Date(Date.now() + 60000),
      },
      { status: 429 }
    );
  }
  const { id } = await params;

  try {
    const result = await fetchMutation(api.budgetFunctions.deleteBudget, {
      AuthId: userId,
      Id: id as Id<"budgets">,
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}
