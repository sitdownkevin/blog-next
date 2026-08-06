import { NextRequest, NextResponse } from "next/server";
import { unstable_rethrow } from "next/navigation";
import { AuthError, requireAdminSession } from "@/lib/auth/session";
import {
  isPersonalIntroDocument,
  readPersonalIntro,
  writePersonalIntro,
} from "@/lib/personal-intro/r2-store";
import { revalidatePersonalIntro } from "@/lib/personal-intro/revalidate";

const EMPTY_PERSONAL_INTRO = {
  abstract: { en: {}, zh: {} },
  education: { en: {}, zh: {} },
  workingExp: { en: {}, zh: {} },
  projects: { en: {}, zh: {} },
  publications: { en: {}, zh: {} },
};

export async function GET() {
  try {
    await requireAdminSession();
    const document = (await readPersonalIntro()) ?? EMPTY_PERSONAL_INTRO;
    return NextResponse.json({ document });
  } catch (error) {
    unstable_rethrow(error);
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("Admin get personal intro error:", error);
    return NextResponse.json(
      { error: "Failed to read personal intro" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdminSession();
    const json = await request.json();
    if (!isPersonalIntroDocument(json)) {
      return NextResponse.json(
        {
          error:
            "Invalid personal intro JSON: expected abstract, education, workingExp, projects, publications (each with en/zh)",
        },
        { status: 400 },
      );
    }

    const document = await writePersonalIntro(json);
    revalidatePersonalIntro();
    return NextResponse.json({ document });
  } catch (error) {
    unstable_rethrow(error);
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("Admin put personal intro error:", error);
    return NextResponse.json(
      { error: "Failed to update personal intro" },
      { status: 500 },
    );
  }
}
