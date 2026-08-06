import { NextRequest, NextResponse } from "next/server";
import { unstable_rethrow } from "next/navigation";
import { z } from "zod";
import { verifySiweLogin } from "@/lib/auth/session";

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
    unstable_rethrow(error);
    console.error("Auth verify error:", error);
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 },
    );
  }
}
