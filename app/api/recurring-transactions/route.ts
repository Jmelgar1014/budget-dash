import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { rateLimit } from "@/utilities/rateLimit";
import { recurringTable } from "@/schema/recurringTransactionSchema";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export async function POST(req: Request) {
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

  const userData = await req.json();

  const userDataId = {
    ...userData,
    AuthId: userId,
  };

  //   console.log(userDataId);

  const parsedUserData = recurringTable.safeParse(userDataId);

  if (!parsedUserData.success) {
    return NextResponse.json({
      error: {
        message: "Data is not valid",
        details: parsedUserData.error,
        status: 400,
      },
    });
  }

  try {
    await fetchMutation(api.recurringFunctions.addRecurringTransaction, {
      ...userDataId,
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
