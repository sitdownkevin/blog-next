import { getMatterList } from "@/lib/posts/getMatterList";
import { getMarkdownContent } from "@/lib/posts/getMarkdownContent";
import { MarkdownType } from "@/lib/posts/types";

import { PostTitle } from "./_components/post-title";
import { PostDate } from "./_components/post-date";
import { PostTags } from "./_components/post-tags";

import { Container as CommentContainer } from "@/components/features/comment/Container";

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

export default async function Post({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
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
      <CommentContainer postId={postId} />
    </div>
  );
}

export const dynamicParams = false;
export async function generateStaticParams() {
  const matterList = getMatterList();
  return matterList.map((matter) => {
    return {
      postId: matter.id,
    };
  });
}
