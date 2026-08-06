"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Posts");

  useEffect(() => {
    console.error("Posts route error:", error);
  }, [error]);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 py-20 px-4">
      <h2 className="text-lg font-medium">{t("errorTitle")}</h2>
      <p className="text-sm text-muted-foreground text-center max-w-md">
        {t("errorDescription")}
      </p>
      <Button variant="outline" onClick={reset}>
        {t("errorRetry")}
      </Button>
    </div>
  );
}
