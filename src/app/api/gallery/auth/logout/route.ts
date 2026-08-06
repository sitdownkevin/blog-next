import { NextResponse } from "next/server";
import { unstable_rethrow } from "next/navigation";
import { clearSession } from "@/lib/gallery/auth";

export async function POST() {
  try {
    await clearSession();
    return NextResponse.json({ ok: true });
  } catch (error) {
    unstable_rethrow(error);
    console.error("Gallery logout error:", error);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
