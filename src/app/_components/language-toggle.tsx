"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Languages } from "lucide-react";

export function LanguageToggle() {
  const searchParams = useSearchParams();
  const currentLang = searchParams.get("language") === "zh" ? "zh" : "en";
  const newLang = currentLang === "en" ? "zh" : "en";
  const label = currentLang === "en" ? "中文" : "English";

  return (
    <Link
      href={`/?language=${newLang}`}
      className="text-foreground/70 hover:text-claude-orange transition-colors duration-300 inline-flex items-center gap-1.5"
      aria-label={`Switch to ${label}`}
      title={`Switch to ${label}`}
    >
      <Languages className="w-4 h-4" />
      <span className="text-xs font-medium tracking-wide hidden sm:inline">
        {label}
      </span>
    </Link>
  );
}
