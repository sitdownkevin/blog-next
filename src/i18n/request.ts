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
    const paramValue = await rootParams.locale();
    if (hasLocale(routing.locales, paramValue)) {
      locale = paramValue;
    } else {
      notFound();
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
