import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { rateLimit } from "@/utilities/rateLimit";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized", status: 401 });
  }

  if (!url) {
    return NextResponse.json(
      { error: "Missing URL parameter" },
      { status: 400 }
    );
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

  //   const json = await req.json()

  try {
    const key = url.split(".amazonaws.com/")[1];
    if (!key.startsWith(`receipts/${userId}`)) {
      return NextResponse.json(
        { error: "Unauthorized - you can only delete your own receipts" },
        { status: 403 }
      );
    }
    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: key,
    });

    const response = await s3Client.send(command);

    return NextResponse.json({ message: response });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
