import { cacheLife, cacheTag } from "next/cache";
import { loadPersonalIntroDocument } from "@/lib/personal-intro/load";
import type { PersonalIntroDocument } from "@/lib/personal-intro/types";

export type { PersonalIntroDocument } from "@/lib/personal-intro/types";

export async function getPersonalIntroData(): Promise<PersonalIntroDocument> {
  "use cache";
  cacheLife("days");
  cacheTag("personal-intro");
  return loadPersonalIntroDocument();
}
