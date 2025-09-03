import { getMatterList } from "@/lib/posts/getMatterList";
import { getMarkdownContent } from "@/lib/posts/getMarkdownContent";
import { MarkdownType } from "@/lib/posts/types";

import { Tag } from "@/components/features/posts/Tags";
import { DateText } from "@/components/features/posts/Date";
import { Title } from "@/components/features/posts/Title";

import { Container as CommentContainer } from "@/components/features/comment/Container";

const renderMarkdownBody = (markdownHtml: string) => {
  return (
    <div
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: markdownHtml }}
    />
  );
};

export default async function Post({ params }) {
  const { postId } = await params;
  const markdownContent: MarkdownType = await getMarkdownContent(postId);

  return (
    <div className="w-full flex flex-col gap-4 mt-8">
      <Title title={markdownContent.title} type="post" postId={postId} />
      <div className="flex flex-row items-center justify-between">
        <Tag tags={markdownContent.tags} />
        <DateText date={markdownContent.update_date} />
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
