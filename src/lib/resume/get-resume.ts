import { cacheLife, cacheTag } from "next/cache";
import type { AppLocale } from "@/i18n/routing";
import type { ResumeDocument, ResumeLocaleData } from "@/lib/resume/data";
import { loadResumeDocument } from "@/lib/resume/load";

export async function getResumeDocument(): Promise<ResumeDocument> {
  "use cache";
  cacheLife("days");
  cacheTag("resume");
  return loadResumeDocument();
}

export async function getResumeData(locale: AppLocale): Promise<ResumeLocaleData> {
  const document = await getResumeDocument();
  return document[locale] ?? document.en;
}
