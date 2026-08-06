import { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getMatterList } from "@/lib/posts/getMatterList";
import { getMarkdownContent } from "@/lib/posts/getMarkdownContent";
import { MarkdownType } from "@/lib/posts/types";

import { PostTitle } from "./_components/post-title";
import { PostDate } from "./_components/post-date";
import { PostTags } from "./_components/post-tags";

import "katex/dist/katex.min.css";
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ postId: string }>;
}): Promise<Metadata> {
  const { postId } = await params;
  const post = (await getMatterList()).find((matter) => matter.id === postId);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const title = `${post.title} - Ke Xu's website`;
  const description =
    post.description || `Blog post by Ke Xu: ${post.title}`;
  const url = `https://kexu.win/posts/${postId}`;

  return {
    title,
    description,
    keywords: post.tags,
    authors: [{ name: "Ke Xu" }],
    openGraph: {
      title: post.title,
      description,
      url,
      siteName: "Ke Xu's website",
      type: "article",
      locale: "en_US",
      ...(post.update_date && {
        modifiedTime: post.update_date.toISOString(),
      }),
      ...(post.create_date && {
        publishedTime: post.create_date.toISOString(),
      }),
    },
    twitter: {
      card: "summary",
      title: post.title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

async function PostContent({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
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

export default function Post({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  return (
    <Suspense fallback={<PostFallback />}>
      <PostContent params={params} />
    </Suspense>
  );
}

export async function generateStaticParams() {
  const matterList = await getMatterList();
  return matterList.map((matter) => {
    return {
      postId: matter.id,
    };
  });
}
