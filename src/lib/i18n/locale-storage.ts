import { hasLocale } from "next-intl";
import { routing, type AppLocale } from "@/i18n/routing";

export const LOCALE_STORAGE_KEY = "locale";

export function isAppLocale(value: string | null | undefined): value is AppLocale {
  return !!value && hasLocale(routing.locales, value);
}

export function readStoredLocale(): AppLocale | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return isAppLocale(value) ? value : null;
  } catch {
    return null;
  }
}

export function writeStoredLocale(locale: AppLocale) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Ignore quota / private mode failures.
  }
}
