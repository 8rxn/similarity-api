import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { RevokeApiData } from "@/types/api";
import { db } from "@/lib/db";
import { z } from "zod";

export async function POST(req: NextRequest, res: NextResponse<RevokeApiData>) {
  try {
    const user = await getServerSession(authOptions).then((session) => {
      return session?.user;
    });

    if (!user) {
      return NextResponse.json(
        { error: "You must be signed in to do that", success: false },
        { status: 401 }
      );
    }

    const validApiKey = await db.apiKey.findFirst({
      where: { userId: user.id, enabled: true },
    });

    if (!validApiKey) {
      return NextResponse.json(
        { error: "The API Key Could not be revoked", success: false },
        { status: 500 }
      );
    }

    await db.apiKey.update({
      where: { id: validApiKey.id },
      data: { enabled: false },
    });

    return NextResponse.json({ error: null, success: true }, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: err.issues, success: false },
        { status: 400 }
      );
    }

    if (err instanceof Error) {
      return NextResponse.json(
        { error: err.message, success: false },
        { status: 500 }
      );
    }
  }
}
