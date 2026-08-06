import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { getMatterList } from "@/lib/posts/getMatterList";
import { PostsList } from "./_components/posts-list";
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
  const t = await getTranslations({ locale, namespace: "Posts" });

  return {
    title: t("metadataTitle"),
    description: t("metadataDescription"),
    alternates: {
      canonical: "https://kexu.win/posts",
    },
  };
}

export default async function Page({ params }: Props) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);

  const matterList = (await getMatterList())
    .filter((matter) => !matter.hidden)
    .map((matter) => ({
      ...matter,
      create_date: matter.create_date?.toISOString(),
      update_date: matter.update_date?.toISOString(),
    }));

  return <PostsList initialMatterList={matterList} />;
}
