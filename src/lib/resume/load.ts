import type { ResumeDocument } from "@/lib/resume/data";
import { readResume } from "@/lib/resume/r2-store";

/** Read resume from R2. Throws if missing or invalid. */
export async function loadResumeDocument(): Promise<ResumeDocument> {
  const existing = await readResume();
  if (!existing) {
    throw new Error("Resume not found in R2 (admin/resume.json)");
  }
  return existing;
}
