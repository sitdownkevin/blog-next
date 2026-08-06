"use client";

import { useTranslations } from "next-intl";
import { PowPanel } from "./_components/pow-panel";

export default function Page() {
  const t = useTranslations("GetMyWx");

  return (
    <div className="w-full py-8 px-4 space-y-8">
      <header className="space-y-2">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-balance">
          {t("title")}
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
          {t("subtitle")}
        </p>
      </header>

      <PowPanel />
    </div>
  );
}
