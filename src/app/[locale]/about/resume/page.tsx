import { Metadata } from "next";
import {
  getLocale,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import Resume from "@/components/features/resume/Resume";
import { getResumeData } from "@/lib/resume/data";
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
    title: t("resumeTitle"),
    description: t("resumeDescription"),
    alternates: {
      canonical: "https://kexu.win/about/resume",
    },
  };
}

export default async function Page({ params }: Props) {
  const localeParam = await resolveLocale(params);
  setRequestLocale(localeParam);

  const locale = (await getLocale()) as AppLocale;
  const data = getResumeData(locale);

  return (
    <div className="w-full py-8 px-4">
      <Resume
        basicInfo={data.basicInfo}
        educationElements={data.educationElements}
        workExperienceElements={data.workExperienceElements}
        projectExperienceElements={data.projectExperienceElements}
        additionalInformationElements={data.additionalInformationElements}
        publications={data.publications}
        locale={locale}
      />
    </div>
  );
}
