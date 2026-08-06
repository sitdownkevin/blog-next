import { NextRequest, NextResponse } from "next/server";
import { unstable_rethrow } from "next/navigation";
import { z } from "zod";
import { isAddress } from "viem";
import { AuthError, requireAdminSession } from "@/lib/auth/session";
import { readWallets, writeWallets } from "@/lib/auth/wallets";

const putSchema = z.object({
  wallets: z.array(z.string().refine((v) => isAddress(v), "Invalid address")),
});

export async function GET() {
  try {
    await requireAdminSession();
    const wallets = await readWallets();
    return NextResponse.json({ wallets });
  } catch (error) {
    unstable_rethrow(error);
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("Admin get wallets error:", error);
    return NextResponse.json({ error: "Failed to read wallets" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdminSession();
    const json = await request.json();
    const parsed = putSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    if (parsed.data.wallets.length === 0) {
      return NextResponse.json(
        { error: "At least one admin wallet is required" },
        { status: 400 },
      );
    }

    const wallets = await writeWallets(parsed.data.wallets);
    return NextResponse.json({ wallets });
  } catch (error) {
    unstable_rethrow(error);
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("Admin put wallets error:", error);
    return NextResponse.json({ error: "Failed to update wallets" }, { status: 500 });
  }
}
