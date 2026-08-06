import { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { HomeContent } from "./_components/home-content";
import { getMatterList } from "@/lib/posts/getMatterList";
import type { LatestPost } from "./_components/personal-intro";
import { hasLocale } from "next-intl";
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
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
    keywords: ["Ke Xu", "personal website", "blog", "portfolio", "徐可"],
    authors: [{ name: "Ke Xu" }],
    creator: "Ke Xu",
    openGraph: {
      title: t("homeTitle"),
      description: t("homeDescription"),
      url: "https://kexu.win",
      siteName: t("homeTitle"),
      images: [
        {
          url: "/og-image.jpg",
          width: 940,
          height: 940,
          alt: t("homeDescription"),
        },
      ],
      locale: locale === "zh" ? "zh_CN" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("homeTitle"),
      description: t("homeDescription"),
      images: ["/og-image.jpg"],
    },
    alternates: {
      canonical: "https://kexu.win",
    },
  };
}

async function getLatestPosts(limit = 3): Promise<LatestPost[]> {
  const matterList = await getMatterList();
  return matterList
    .filter((matter) => !matter.hidden)
    .sort(
      (a, b) =>
        (b.update_date?.getTime() ?? 0) - (a.update_date?.getTime() ?? 0),
    )
    .slice(0, limit)
    .map((matter) => ({
      id: matter.id,
      title: matter.title,
      description: matter.description,
      create_date: matter.create_date?.toISOString(),
      update_date: matter.update_date?.toISOString(),
    }));
}

export default async function Page({ params }: Props) {
  const localeParam = await resolveLocale(params);
  setRequestLocale(localeParam);

  const locale = (await getLocale()) as AppLocale;
  const latestPosts = await getLatestPosts(3);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ke Xu",
    url: "https://kexu.win",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
        }}
      />
      <HomeContent lang={locale} latestPosts={latestPosts} />
    </>
  );
}
