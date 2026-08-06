"use client";

import { Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { writeStoredLocale } from "@/lib/i18n/locale-storage";
import type { AppLocale } from "@/i18n/routing";

export function LanguageToggle() {
  const t = useTranslations("Language");
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();

  const nextLocale: AppLocale = locale === "en" ? "zh" : "en";
  const label = nextLocale === "zh" ? t("switchToZh") : t("switchToEn");

  return (
    <button
      type="button"
      onClick={() => {
        writeStoredLocale(nextLocale);
        router.replace(pathname, { locale: nextLocale });
      }}
      className="text-foreground/70 hover:text-claude-orange transition-colors duration-300 inline-flex items-center gap-1.5 cursor-pointer"
      aria-label={t("switchAria", { label })}
      title={t("switchAria", { label })}
    >
      <Languages className="w-4 h-4" />
      <span className="text-xs font-medium tracking-wide hidden sm:inline">
        {label}
      </span>
    </button>
  );
}
