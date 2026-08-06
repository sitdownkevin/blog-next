import { NextRequest, NextResponse } from "next/server";
import { unstable_rethrow } from "next/navigation";
import { AuthError, requireAdminSession } from "@/lib/auth/session";
import { readResume, isResumeDocument, writeResume } from "@/lib/resume/r2-store";
import { revalidateResume } from "@/lib/resume/revalidate";

const EMPTY_RESUME = { en: {}, zh: {} };

export async function GET() {
  try {
    await requireAdminSession();
    const document = (await readResume()) ?? EMPTY_RESUME;
    return NextResponse.json({ document });
  } catch (error) {
    unstable_rethrow(error);
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("Admin get resume error:", error);
    return NextResponse.json({ error: "Failed to read resume" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdminSession();
    const json = await request.json();
    if (!isResumeDocument(json)) {
      return NextResponse.json(
        { error: "Invalid resume JSON: expected top-level en and zh objects" },
        { status: 400 },
      );
    }

    const document = await writeResume(json);
    revalidateResume();
    return NextResponse.json({ document });
  } catch (error) {
    unstable_rethrow(error);
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("Admin put resume error:", error);
    return NextResponse.json({ error: "Failed to update resume" }, { status: 500 });
  }
}
