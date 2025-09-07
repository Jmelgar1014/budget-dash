import { NextResponse } from "next/server";
import { api } from "@/convex/_generated/api";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import {
  addTransactionForm,
  TransactionDetailed,
} from "@/schema/TransactionSchema";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await req.json();

  const parsedResult = addTransactionForm.safeParse(json);

  if (!parsedResult.success) {
    return NextResponse.json({
      error: {
        message: "Data is not valid",
        status: 401,
      },
    });
  }

  console.log(parsedResult.data);

  try {
    await fetchMutation(api.transactionsFuncs.addTransaction, {
      ...parsedResult.data,
      AuthId: userId,
    });

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

export async function GET(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
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
