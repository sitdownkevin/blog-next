import { NextResponse } from "next/server";
import { unstable_rethrow } from "next/navigation";
import { createNonce } from "@/lib/auth/session";

export async function GET() {
  try {
    const nonce = await createNonce();
    return NextResponse.json({ nonce });
  } catch (error) {
    unstable_rethrow(error);
    console.error("Auth nonce error:", error);
    return NextResponse.json(
      { error: "Failed to create nonce" },
      { status: 500 },
    );
  }
}
