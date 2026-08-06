import { Suspense } from "react";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { Loader2 } from "lucide-react";

import { GalleryPage } from "@/components/features/gallery/gallery-page";
import { routing, type AppLocale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

async function resolveLocale(params: Props["params"]): Promise<AppLocale> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return routing.defaultLocale;
  }
  return locale;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "Gallery" });

  return {
    title: t("metadataTitle"),
    description: t("metadataDescription"),
    alternates: {
      canonical: "https://kexu.win/about/gallery",
    },
  };
}

function GalleryFallback() {
  return (
    <div className="w-full py-8 px-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground py-12">
        <Loader2 className="size-4 animate-spin" />
      </div>
    </div>
  );
}

export default async function Page({ params }: Props) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);

  return (
    <Suspense fallback={<GalleryFallback />}>
      <GalleryPage />
    </Suspense>
  );
}
