import { NextRequest, NextResponse } from "next/server";
import { unstable_rethrow } from "next/navigation";
import {
  DEFAULT_LIST_LIMIT,
  GALLERY_PUBLIC_PREFIX,
  MAX_LIST_LIMIT,
} from "@/lib/gallery/constants";
import { listImagesRecursive } from "@/lib/gallery/r2";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const cursor = searchParams.get("cursor");
    const limitRaw = Number(searchParams.get("limit") ?? DEFAULT_LIST_LIMIT);
    const limit = Number.isFinite(limitRaw)
      ? Math.min(MAX_LIST_LIMIT, Math.max(1, Math.floor(limitRaw)))
      : DEFAULT_LIST_LIMIT;

    const result = await listImagesRecursive(GALLERY_PUBLIC_PREFIX, {
      cursor,
      limit,
    });

    return NextResponse.json({
      prefix: GALLERY_PUBLIC_PREFIX,
      entries: result.entries,
      nextCursor: result.nextCursor,
    });
  } catch (error) {
    unstable_rethrow(error);
    console.error("Gallery public list error:", error);
    return NextResponse.json(
      { error: "Failed to list gallery" },
      { status: 500 },
    );
  }
}
