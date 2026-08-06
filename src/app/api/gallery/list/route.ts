import { NextRequest, NextResponse } from "next/server";
import { unstable_rethrow } from "next/navigation";
import { AuthError, requireAdminSession } from "@/lib/gallery/auth";
import { DEFAULT_LIST_LIMIT, MAX_LIST_LIMIT } from "@/lib/gallery/constants";
import { normalizeAdminPath } from "@/lib/gallery/path";
import { listPrefix } from "@/lib/gallery/r2";

export async function GET(request: NextRequest) {
  try {
    await requireAdminSession();

    const { searchParams } = request.nextUrl;
    const raw = searchParams.get("prefix") ?? "";
    const cursor = searchParams.get("cursor");
    const limitRaw = Number(searchParams.get("limit") ?? DEFAULT_LIST_LIMIT);
    const limit = Number.isFinite(limitRaw)
      ? Math.min(MAX_LIST_LIMIT, Math.max(1, Math.floor(limitRaw)))
      : DEFAULT_LIST_LIMIT;

    let prefix: string;
    try {
      prefix = normalizeAdminPath(raw, { asPrefix: true });
    } catch {
      return NextResponse.json({ error: "Invalid prefix" }, { status: 400 });
    }

    const result = await listPrefix(prefix, { cursor, limit });
    return NextResponse.json(result);
  } catch (error) {
    unstable_rethrow(error);
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("Gallery list error:", error);
    return NextResponse.json(
      { error: "Failed to list gallery" },
      { status: 500 },
    );
  }
}
