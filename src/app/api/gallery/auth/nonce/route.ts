import { NextResponse } from "next/server";
import { createNonce } from "@/lib/gallery/auth";

export async function GET() {
  try {
    const nonce = await createNonce();
    return NextResponse.json({ nonce });
  } catch (error) {
    console.error("Gallery nonce error:", error);
    return NextResponse.json(
      { error: "Failed to create nonce" },
      { status: 500 },
    );
  }
}
