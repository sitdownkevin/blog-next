import { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getMatterList } from "@/lib/posts/getMatterList";
import { getMarkdownContent } from "@/lib/posts/getMarkdownContent";
import { MarkdownType } from "@/lib/posts/types";
import { routing, type AppLocale } from "@/i18n/routing";
import { serializeJsonLd } from "@/lib/seo/json-ld";
import {
  SITE_AUTHOR,
  SITE_OG_IMAGE,
  SITE_URL,
  absoluteUrl,
} from "@/lib/seo/site";

import { PostTitle } from "./_components/post-title";
import { PostDate } from "./_components/post-date";
import { PostTags } from "./_components/post-tags";

import "katex/dist/katex.min.css";
import "prism-themes/themes/prism-vsc-dark-plus.css";
import "./markdown.css";
import "./katex.css";

const renderMarkdownBody = (markdownHtml: string) => {
  return (
    <div
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: markdownHtml }}
    />
  );
};

type Props = {
  params: Promise<{ locale: string; postId: string }>;
};

async function resolveLocale(locale: string): Promise<AppLocale> {
  if (!hasLocale(routing.locales, locale)) {
    return routing.defaultLocale;
  }
  return locale;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam, postId } = await params;
  const locale = await resolveLocale(localeParam);
  const t = await getTranslations({ locale, namespace: "Posts" });
  const tMeta = await getTranslations({ locale, namespace: "Metadata" });
  const post = (await getMatterList()).find((matter) => matter.id === postId);

  if (!post) {
    return {
      title: t("postNotFound"),
    };
  }

  const siteName = tMeta("homeTitle");
  const description = post.description || post.title;
  const url = absoluteUrl(`/posts/${postId}`);
  const ogImage = absoluteUrl(SITE_OG_IMAGE);

  return {
    title: post.title,
    description,
    keywords: post.tags,
    authors: [{ name: SITE_AUTHOR.name }],
    openGraph: {
      title: post.title,
      description,
      url,
      siteName,
      type: "article",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      images: [
        {
          url: ogImage,
          width: 940,
          height: 940,
          alt: post.title,
        },
      ],
      ...(post.update_date && {
        modifiedTime: post.update_date.toISOString(),
      }),
      ...(post.create_date && {
        publishedTime: post.create_date.toISOString(),
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

async function PostJsonLd({ postId }: { postId: string }) {
  const post = (await getMatterList()).find((matter) => matter.id === postId);
  if (!post) {
    return null;
  }

  const url = absoluteUrl(`/posts/${postId}`);
  const description = post.description || post.title;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description,
    image: absoluteUrl(SITE_OG_IMAGE),
    author: {
      "@type": "Person",
      name: SITE_AUTHOR.name,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: SITE_AUTHOR.name,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    ...(post.create_date && {
      datePublished: post.create_date.toISOString(),
    }),
    ...(post.update_date && {
      dateModified: post.update_date.toISOString(),
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd(articleSchema),
      }}
    />
  );
}

async function PostContent({ params }: Props) {
  const { locale: localeParam, postId } = await params;
  setRequestLocale(await resolveLocale(localeParam));

  const exists = (await getMatterList()).some((matter) => matter.id === postId);
  if (!exists) {
    notFound();
  }

  const markdownContent: MarkdownType = await getMarkdownContent(postId);

  return (
    <div className="w-full flex flex-col gap-4 py-8 px-4">
      <PostTitle title={markdownContent.title} />
      <div className="flex flex-row items-center justify-between">
        <PostTags tags={markdownContent.tags} />
        {markdownContent.update_date && (
          <PostDate date={markdownContent.update_date} />
        )}
      </div>
      {renderMarkdownBody(markdownContent.content)}
    </div>
  );
}

function PostFallback() {
  return (
    <div className="w-full flex flex-col gap-4 py-8 px-4 animate-pulse">
      <div className="h-8 w-3/4 rounded bg-muted" />
      <div className="flex justify-between">
        <div className="h-4 w-32 rounded bg-muted" />
        <div className="h-4 w-20 rounded bg-muted" />
      </div>
      <div className="mt-4 flex flex-col space-y-3">
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-5/6 rounded bg-muted" />
      </div>
    </div>
  );
}

export default async function Post({ params }: Props) {
  const { postId } = await params;

  return (
    <>
      <PostJsonLd postId={postId} />
      <Suspense fallback={<PostFallback />}>
        <PostContent params={params} />
      </Suspense>
    </>
  );
}

export async function generateStaticParams() {
  const matterList = await getMatterList();
  return routing.locales.flatMap((locale) =>
    matterList.map((matter) => ({
      locale,
      postId: matter.id,
    })),
  );
}
