import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import * as rootParams from "next/root-params";
import { routing, type AppLocale } from "./routing";
import en from "../../messages/en.json";
import zh from "../../messages/zh.json";

const messagesByLocale: Record<AppLocale, typeof en> = {
  en,
  zh,
};

export default getRequestConfig(async ({ locale: overrideLocale }) => {
  let locale = overrideLocale;

  if (!locale) {
    // [locale] is a root param on localized routes; unlocalized roots (e.g. /admin) have none.
    const localeFn = (
      rootParams as { locale?: () => Promise<string | undefined> }
    ).locale;
    const paramValue = localeFn ? await localeFn() : undefined;
    if (hasLocale(routing.locales, paramValue)) {
      locale = paramValue;
    } else {
      locale = routing.defaultLocale;
    }
  }

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return {
    locale,
    messages: messagesByLocale[locale],
  };
});
