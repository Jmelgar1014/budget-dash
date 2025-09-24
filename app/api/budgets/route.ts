import { NextResponse } from "next/server";
import { api } from "@/convex/_generated/api";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { budgetTable } from "@/schema/budgetSchema";

const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "60 s"),
  prefix: "@upstash/ratelimit",
  analytics: true,
});

export async function GET(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized", status: 401 });
  }

  try {
    const data = await fetchQuery(api.budgetFunctions.getBudgets, {
      AuthId: userId,
    });

    console.log(data);

    if (data == null) {
      return NextResponse.json([]);
    }

    return NextResponse.json({ message: "Success", data: data });
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
