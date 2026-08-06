import { NextRequest, NextResponse } from "next/server";
import { unstable_rethrow } from "next/navigation";
import { z } from "zod";
import { AuthError, requireAdminSession } from "@/lib/gallery/auth";
import {
  isProtectedAdminKey,
  mimeMatchesKey,
  normalizeAdminPath,
} from "@/lib/gallery/path";
import { presignPut } from "@/lib/gallery/r2";
import { ALLOWED_IMAGE_TYPES } from "@/lib/gallery/types";

const bodySchema = z.object({
  key: z.string().min(1).max(1024),
  contentType: z.enum(ALLOWED_IMAGE_TYPES),
});

export async function POST(request: NextRequest) {
  try {
    await requireAdminSession();

    const json = await request.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    let key: string;
    try {
      key = normalizeAdminPath(parsed.data.key, { asPrefix: false });
    } catch {
      return NextResponse.json({ error: "Invalid key" }, { status: 400 });
    }

    if (isProtectedAdminKey(key)) {
      return NextResponse.json(
        { error: "Cannot write to protected admin path" },
        { status: 403 },
      );
    }

    if (!mimeMatchesKey(key, parsed.data.contentType)) {
      return NextResponse.json(
        { error: "Content type does not match key extension" },
        { status: 400 },
      );
    }

    const result = await presignPut(key, parsed.data.contentType);
    return NextResponse.json(result);
  } catch (error) {
    unstable_rethrow(error);
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("Gallery presign error:", error);
    return NextResponse.json(
      { error: "Failed to create upload URL" },
      { status: 500 },
    );
  }
}
