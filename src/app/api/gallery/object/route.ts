import { NextRequest, NextResponse } from "next/server";
import { unstable_rethrow } from "next/navigation";
import { z } from "zod";
import { AuthError, requireAdminSession } from "@/lib/gallery/auth";
import { normalizeDirKey, normalizeKey } from "@/lib/gallery/path";
import { deleteByKey } from "@/lib/gallery/r2";

const bodySchema = z.object({
  key: z.string().min(1).max(1024),
});

export async function DELETE(request: NextRequest) {
  try {
    await requireAdminSession();

    const json = await request.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const raw = parsed.data.key;
    let key: string;
    try {
      key = raw.endsWith("/") ? normalizeDirKey(raw) : normalizeKey(raw);
    } catch {
      return NextResponse.json({ error: "Invalid key" }, { status: 400 });
    }

    const result = await deleteByKey(key);
    return NextResponse.json(result);
  } catch (error) {
    unstable_rethrow(error);
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("Gallery delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete object" },
      { status: 500 },
    );
  }
}
