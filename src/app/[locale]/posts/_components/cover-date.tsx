"use client";

import { useLocale } from "next-intl";
import { isDisplayablePostDate } from "@/lib/posts/parse-post-date";

export function CoverDate({ date }: { date: Date }) {
  const locale = useLocale();
  if (!isDisplayablePostDate(date)) return null;

  return (
    <span className="select-none text-muted-foreground text-xs font-mono tabular-nums shrink-0">
      {date.toLocaleDateString(locale === "zh" ? "zh-CN" : "en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}
    </span>
  );
}
