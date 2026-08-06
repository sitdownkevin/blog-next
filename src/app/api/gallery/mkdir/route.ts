import { NextRequest, NextResponse } from "next/server";
import { unstable_rethrow } from "next/navigation";
import { z } from "zod";
import { AuthError, requireAdminSession } from "@/lib/gallery/auth";
import {
  isProtectedAdminKey,
  normalizeAdminPath,
} from "@/lib/gallery/path";
import { putEmptyDir } from "@/lib/gallery/r2";

const bodySchema = z.object({
  path: z.string().min(1).max(512),
});

export async function POST(request: NextRequest) {
  try {
    await requireAdminSession();

    const json = await request.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    let dirKey: string;
    try {
      dirKey = normalizeAdminPath(parsed.data.path, { asPrefix: true });
    } catch {
      return NextResponse.json({ error: "Invalid directory path" }, { status: 400 });
    }

    if (!dirKey) {
      return NextResponse.json({ error: "Invalid directory path" }, { status: 400 });
    }

    if (isProtectedAdminKey(dirKey) || dirKey === "admin/") {
      return NextResponse.json(
        { error: "Cannot create directory under protected admin path" },
        { status: 403 },
      );
    }

    await putEmptyDir(dirKey);
    return NextResponse.json({ key: dirKey });
  } catch (error) {
    unstable_rethrow(error);
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("Gallery mkdir error:", error);
    return NextResponse.json(
      { error: "Failed to create directory" },
      { status: 500 },
    );
  }
}
