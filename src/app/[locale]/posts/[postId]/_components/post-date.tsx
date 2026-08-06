"use client";

import { useLocale } from "next-intl";
import { isDisplayablePostDate } from "@/lib/posts/parse-post-date";

export function PostDate({ date }: { date: Date | string }) {
  const locale = useLocale();
  const resolvedDate = date instanceof Date ? date : new Date(date);
  if (!isDisplayablePostDate(resolvedDate)) return null;

  const pivotDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
  if (resolvedDate.getTime() <= pivotDate.getTime()) {
    return null;
  }

  return (
    <p className="select-none text-muted-foreground text-xs font-medium font-mono tabular-nums">
      {resolvedDate.toLocaleDateString(locale === "zh" ? "zh-CN" : "en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}
    </p>
  );
}
