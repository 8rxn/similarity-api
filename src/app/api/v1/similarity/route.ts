import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { RevokeApiData } from "@/types/api";
import { db } from "@/lib/db";
import { headers } from "next/headers";
import { z } from "zod";
import cosineSimilarity from "@/helpers/get-similarity";

const reqSchema = z.object({
  text1: z.string().max(1000),
  text2: z.string().max(1000),
});

export async function POST(req: Request, res: NextResponse<RevokeApiData>) {
  const apiKey = headers().get("authorization");

  if (!apiKey) {
    return NextResponse.json(
      { error: "You don't have a valid API Key", success: false },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { text1, text2 } = reqSchema.parse(body);

    const validApiKey = await db.apiKey.findFirst({
      where: {
        key: apiKey,
        enabled: true,
      },
    });

    if (!validApiKey) {
      return NextResponse.json(
        { error: "You don't have a valid API Key", success: false },
        { status: 401 }
      );
    }

    const start = new Date();

    const similarity = cosineSimilarity(text1, text2);

    const duration = new Date().getTime() - start.getTime();
    await db.apiRequest.create({
      data: {
        duration,
        method: req.method as string,
        path: req.url as string,
        status: 200,
        apiKeyId: validApiKey.id,
        usedApiKey: validApiKey.key,
      },
    });

    return NextResponse.json(
      { text1, text2, similarity, success: true },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues, success: false },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
