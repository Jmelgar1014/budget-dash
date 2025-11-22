import { NextResponse } from "next/server";
import { api } from "@/convex/_generated/api";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Id } from "@/convex/_generated/dataModel";
import { rateLimit } from "@/utilities/rateLimit";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const transaction = await fetchQuery(
      api.transactionsFuncs.getTransactionDetails,
      {
        AuthId: userId,
        TransactionId: id,
      }
    );
    return NextResponse.json(transaction);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}

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
        error: "Rate limit exceeded",
        limit,
        remaining,
        reset: new Date(Date.now() + 60000), // 60s from now
      },
      { status: 429 }
    );
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

export async function PATCH(
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
        error: "Rate limit exceeded",
        limit,
        remaining,
        reset: new Date(Date.now() + 60000), // 60s from now
      },
      { status: 429 }
    );
  }

  const { id } = await params;

  const json = await req.json();

  try {
    const result = await fetchMutation(
      api.transactionsFuncs.updateTransaction,
      {
        AuthId: userId,
        TransactionId: id as Id<"transactions">,
        ...json,
      }
    );

    if (!result) {
      return NextResponse.json({ Data: "There was no transaction" });
    }

    return NextResponse.json({ transaction: result });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
