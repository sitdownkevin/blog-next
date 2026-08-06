import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifySiweLogin } from "@/lib/gallery/auth";

const bodySchema = z.object({
  message: z.string().min(1),
  signature: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const host = request.headers.get("host") ?? "localhost";
    const result = await verifySiweLogin({
      message: parsed.data.message,
      signature: parsed.data.signature,
      host,
    });

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status },
      );
    }

    return NextResponse.json({ address: result.address });
  } catch (error) {
    console.error("Gallery verify error:", error);
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 },
    );
  }
}
