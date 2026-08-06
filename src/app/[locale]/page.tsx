import { Metadata } from "next";
import { Suspense } from "react";
import { HomeContent } from "./_components/home-content";
import { getMatterList } from "@/lib/posts/getMatterList";
import type { LatestPost } from "./_components/personal-intro";

export const metadata: Metadata = {
  title: "Ke Xu's website",
  description:
    "Hi, I'm Ke Xu, a Ph.D. candidate in Information Systems at Tongji University, Shanghai, China.",
  keywords: ["Ke Xu", "personal website", "blog", "portfolio"],
  authors: [{ name: "Ke Xu" }],
  creator: "Ke Xu",
  openGraph: {
    title: "Ke Xu's website",
    description:
      "Hi, I'm Ke Xu, a Ph.D. candidate in Information Systems at Tongji University, Shanghai, China.",
    url: "https://kexu.win",
    siteName: "Ke Xu's website",
    images: [
      {
        url: "/og-image.jpg",
        width: 940,
        height: 940,
        alt: "Hi, I'm Ke Xu, a Ph.D. candidate in Information Systems at Tongji University, Shanghai, China.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ke Xu's website",
    description:
      "Hi, I'm Ke Xu, a Ph.D. candidate in Information Systems at Tongji University, Shanghai, China.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://kexu.win",
  },
};

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

async function HomeWithLang({
  searchParams,
  latestPosts,
}: {
  searchParams?: Promise<{ language?: string }>;
  latestPosts: LatestPost[];
}) {
  const params = await searchParams;
  const lang = params?.language === "zh" ? "zh" : "en";
  return <HomeContent lang={lang} latestPosts={latestPosts} />;
}

function HomeFallback({ latestPosts }: { latestPosts: LatestPost[] }) {
  return <HomeContent lang="en" latestPosts={latestPosts} />;
}

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ language?: string }>;
}) {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Suspense fallback={<HomeFallback latestPosts={latestPosts} />}>
        <HomeWithLang searchParams={searchParams} latestPosts={latestPosts} />
      </Suspense>
    </>
  );
}
