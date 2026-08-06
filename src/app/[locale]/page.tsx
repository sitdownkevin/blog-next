import { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { HomeContent } from "./_components/home-content";
import { getMatterList } from "@/lib/posts/getMatterList";
import { getPersonalIntroData } from "@/lib/personal-intro/data";
import type { LatestPost } from "./_components/personal-intro";
import { hasLocale } from "next-intl";
import { routing, type AppLocale } from "@/i18n/routing";
import { serializeJsonLd } from "@/lib/seo/json-ld";
import {
  SITE_AUTHOR,
  SITE_OG_IMAGE,
  SITE_URL,
  absoluteUrl,
} from "@/lib/seo/site";

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
    title: {
      absolute: t("homeTitle"),
    },
    description: t("homeDescription"),
    keywords: ["Ke Xu", "personal website", "blog", "portfolio", "徐可"],
    authors: [{ name: SITE_AUTHOR.name }],
    creator: SITE_AUTHOR.name,
    openGraph: {
      title: t("homeTitle"),
      description: t("homeDescription"),
      url: SITE_URL,
      siteName: t("homeTitle"),
      images: [
        {
          url: SITE_OG_IMAGE,
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
      images: [SITE_OG_IMAGE],
    },
    alternates: {
      canonical: absoluteUrl("/"),
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
  const [latestPosts, personalIntro] = await Promise.all([
    getLatestPosts(3),
    getPersonalIntroData(),
  ]);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_AUTHOR.name,
    url: SITE_URL,
    email: SITE_AUTHOR.email,
    jobTitle: SITE_AUTHOR.jobTitle,
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: SITE_AUTHOR.affiliation,
    },
    image: absoluteUrl(SITE_OG_IMAGE),
    sameAs: [SITE_AUTHOR.githubUrl],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(personSchema),
        }}
      />
      <HomeContent
        lang={locale}
        latestPosts={latestPosts}
        personalIntro={personalIntro}
      />
    </>
  );
}
