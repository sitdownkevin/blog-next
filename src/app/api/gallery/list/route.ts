import { NextRequest, NextResponse } from "next/server";
import { unstable_rethrow } from "next/navigation";
import { normalizePrefix } from "@/lib/gallery/path";
import { listPrefix } from "@/lib/gallery/r2";

export async function GET(request: NextRequest) {
  try {
    const raw = request.nextUrl.searchParams.get("prefix") ?? "";
    let prefix: string;
    try {
      prefix = normalizePrefix(raw);
    } catch {
      return NextResponse.json({ error: "Invalid prefix" }, { status: 400 });
    }

    const result = await listPrefix(prefix);
    return NextResponse.json(result);
  } catch (error) {
    unstable_rethrow(error);
    console.error("Gallery list error:", error);
    return NextResponse.json(
      { error: "Failed to list gallery" },
      { status: 500 },
    );
  }
}
