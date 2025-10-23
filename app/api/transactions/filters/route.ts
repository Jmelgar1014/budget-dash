import { NextResponse } from "next/server";
import { api } from "@/convex/_generated/api";
import { auth } from "@clerk/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import { Id } from "@/convex/_generated/dataModel";

export async function GET(req: Request) {
  const { userId, getToken } = await auth();

  const token = await getToken();
  console.log(`token: ${token}`);
  console.log(`id: ${userId}`);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);

  const currentDate = new Date();
  console.log(currentDate);
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const textValue = searchParams.get("text") || "";
  const category = searchParams.get("category") || "";
  const month = parseInt(searchParams.get("month") || currentMonth.toString());
  const year = parseInt(searchParams.get("year") || currentYear.toString());

  console.log(textValue);
  console.log(category);

  try {
    const filteredResults = await fetchQuery(
      api.transactionsFuncs.getTransactionPerParams,
      {
        AuthId: userId as Id<"transactions">,
        Category: category,
        InputValue: textValue,
        Month: month,
        Year: year,
      }
    );

    return NextResponse.json(filteredResults);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve transactions" },
      { status: 500 }
    );
  }
}
