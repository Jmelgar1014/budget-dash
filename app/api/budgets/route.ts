import { NextResponse } from "next/server";
import { api } from "@/convex/_generated/api";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { getBudgetData } from "@/schema/budgetSchema";
import { budgetTable } from "@/schema/budgetSchema";
import { rateLimit } from "@/utilities/rateLimit";

export async function GET(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized", status: 401 });
  }

  try {
    const data = await fetchQuery(api.budgetFunctions.getBudgets, {
      AuthId: userId,
    });

    const parsedData = z.array(getBudgetData).safeParse(data);

    if (!parsedData.success) {
      return NextResponse.json({
        error: {
          message: "Data is not valid",
          status: 401,
        },
      });
    }

    console.log(data);

    if (data == null) {
      return NextResponse.json([]);
    }

    return NextResponse.json({ message: "Success", data: parsedData.data });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(req: Request) {
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

  const request = await req.json();

  const parsedRequest = budgetTable.safeParse(request);

  if (!parsedRequest.success) {
    return NextResponse.json(
      { error: "Data received is not formatted" },
      { status: 401 }
    );
  }

  try {
    await fetchMutation(api.budgetFunctions.createBudget, {
      ...parsedRequest.data,
      AuthId: userId,
    });
    return NextResponse.json(
      {
        Success: {
          redis: success,
          limit: limit,
          remaining: remaining,
          message: "Submission was successful",
          status: 200,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          redis: success,
          limit: limit,
          remaining: remaining,
          message: `${error}`,
        },
      },
      { status: 500 }
    );
  }
}
