import { NextResponse } from "next/server";
import { api } from "@/convex/_generated/api";
import { fetchMutation, fetchQuery } from "convex/nextjs";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import {
  addTransactionForm,
  TransactionDetailed,
} from "@/schema/TransactionSchema";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "60 s"),
  prefix: "@upstash/ratelimit",
  analytics: true,
});

export async function POST(req: Request) {
  const { userId, getToken } = await auth();

  const token = await getToken();
  console.log(token);

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

  const json = await req.json();

  const parsedResult = addTransactionForm.safeParse(json);

  if (!parsedResult.success) {
    return NextResponse.json(
      {
        error: {
          message: "Data is not valid",
          details: parsedResult.error,
          status: 400,
        },
      },
      { status: 400 }
    );
  }

  console.log(parsedResult.data);

  try {
    await fetchMutation(api.transactionsFuncs.addTransaction, {
      ...parsedResult.data,
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
          status: 401,
        },
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { userId } = await auth();
  console.log(userId);

  // const token = await getToken();

  // console.log(token);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);

  const currentDate = new Date();
  console.log(currentDate);
  const currentMonth = currentDate.getMonth() + 1;
  console.log(currentMonth);
  const currentYear = currentDate.getFullYear();

  const month = parseInt(searchParams.get("month") || currentMonth.toString());
  const year = parseInt(searchParams.get("year") || currentYear.toString());

  try {
    const data = await fetchQuery(api.transactionsFuncs.getTransactions, {
      AuthId: userId,
      month,
      year,
    });

    const result = z.array(TransactionDetailed).safeParse(data);

    if (!result.success) {
      return NextResponse.json({
        error: {
          message: "Data is not valid",
          status: 401,
        },
      });
    }

    console.log(result.data);

    return NextResponse.json(result.data);
  } catch (error) {
    return NextResponse.json({
      error: {
        message: error,
        status: 401,
      },
    });
  }
}
