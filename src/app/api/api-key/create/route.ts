import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { CreateApiData } from "@/types/api";
import { db } from "@/lib/db";
import { nanoid } from "nanoid";
import { z } from "zod";

export async function GET(req: NextRequest, res: NextResponse<CreateApiData>) {
  try {
    const user = await getServerSession(authOptions).then((session) => {
      return session?.user;
    });

    if (!user) {
      return NextResponse.json(
        { error: "You must be signed iin to do that", createdApiKey: null },
        { status: 401 }
      );
    }

    const existingKey = await db.apiKey.findFirst({
      where: { userId: user.id, enabled: true },
    });

    if (existingKey) {
      return NextResponse.json(
        { error: "You already have an API key", createdApiKey: null },
        { status: 400 }
      );
    }

    const createdApiKey = await db.apiKey.create({
      data: {
        userId: user.id,
        key: nanoid(),
      },
    });

    return NextResponse.json({ error: null, createdApiKey }, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: err.issues, createdApiKey: null },
        { status: 400 }
      );
    }

    if (err instanceof Error) {
      return NextResponse.json(
        { error: err.message, createdApiKey: null },
        { status: 500 }
      );
    }
  }
}
