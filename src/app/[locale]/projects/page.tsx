import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing, type AppLocale } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/seo/site";
import { getProjects, type ProjectLocale } from "@/lib/projects/data";
import { ProjectsList } from "./_components/projects-list";

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
  const t = await getTranslations({ locale, namespace: "Projects" });

  return {
    title: t("metadataTitle"),
    description: t("metadataDescription"),
    alternates: {
      canonical: absoluteUrl("/projects"),
    },
  };
}

export default async function Page({ params }: Props) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);

  const projects = getProjects(locale as ProjectLocale);

  return <ProjectsList projects={projects} />;
}
