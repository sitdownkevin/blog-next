import { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing, type AppLocale } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/seo/site";
import {
  getProjectBySlug,
  getProjectSlugs,
  type ProjectLocale,
} from "@/lib/projects/data";
import { ProjectDetail } from "../_components/project-detail";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

async function resolveLocale(locale: string): Promise<AppLocale> {
  if (!hasLocale(routing.locales, locale)) {
    return routing.defaultLocale;
  }
  return locale;
}

export function generateStaticParams() {
  return getProjectSlugs().flatMap((slug) =>
    routing.locales.map((locale) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = await resolveLocale(localeParam);
  const project = getProjectBySlug(slug, locale as ProjectLocale);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: absoluteUrl(`/projects/${project.slug}`),
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale: localeParam, slug } = await params;
  const locale = await resolveLocale(localeParam);
  setRequestLocale(locale);

  const project = getProjectBySlug(slug, locale as ProjectLocale);
  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
