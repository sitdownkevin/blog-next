import { readPersonalIntro } from "@/lib/personal-intro/r2-store";
import type { PersonalIntroDocument } from "@/lib/personal-intro/types";

/** Read personal intro from R2. Throws if missing or invalid. */
export async function loadPersonalIntroDocument(): Promise<PersonalIntroDocument> {
  const existing = await readPersonalIntro();
  if (!existing) {
    throw new Error(
      "Personal intro not found in R2 (admin/personal-intro.json)",
    );
  }
  return existing;
}
