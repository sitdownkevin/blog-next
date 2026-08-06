import { NextRequest, NextResponse } from "next/server";
import { unstable_rethrow } from "next/navigation";
import { z } from "zod";
import { AuthError, requireAdminSession } from "@/lib/auth/session";
import { createBasePipeline } from "@/lib/posts/markdownPipeline";

const bodySchema = z.object({
  content: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    await requireAdminSession();
    const json = await request.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const pipeline = createBasePipeline();
    const contentProcessed = await pipeline.process(parsed.data.content);
    return NextResponse.json({ html: contentProcessed.toString() });
  } catch (error) {
    unstable_rethrow(error);
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("Admin preview error:", error);
    return NextResponse.json({ error: "Preview failed" }, { status: 500 });
  }
}
