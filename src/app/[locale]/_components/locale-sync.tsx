"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { readStoredLocale, writeStoredLocale } from "@/lib/i18n/locale-storage";
import type { AppLocale } from "@/i18n/routing";

export function LocaleSync() {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();
  const syncedRef = useRef(false);

  useEffect(() => {
    if (syncedRef.current) return;
    syncedRef.current = true;

    const stored = readStoredLocale();
    if (stored && stored !== locale) {
      router.replace(pathname, { locale: stored });
      return;
    }

    writeStoredLocale(locale);
  }, [locale, pathname, router]);

  return null;
}
