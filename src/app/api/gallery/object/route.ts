import { NextRequest, NextResponse } from "next/server";
import { unstable_rethrow } from "next/navigation";
import { z } from "zod";
import { AuthError, requireAdminSession } from "@/lib/gallery/auth";
import {
  isProtectedAdminKey,
  normalizeAdminPath,
} from "@/lib/gallery/path";
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
      key = normalizeAdminPath(raw, { asPrefix: raw.endsWith("/") });
    } catch {
      return NextResponse.json({ error: "Invalid key" }, { status: 400 });
    }

    if (!key) {
      return NextResponse.json(
        { error: "Cannot delete bucket root" },
        { status: 400 },
      );
    }

    if (isProtectedAdminKey(key) || key === "admin/") {
      return NextResponse.json(
        { error: "Cannot delete protected admin path" },
        { status: 403 },
      );
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
