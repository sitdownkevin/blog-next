import { getMatterList } from "@/lib/posts/getMatterList";
import { getMarkdownContent } from "@/lib/posts/getMarkdownContent";
import { MarkdownType } from "@/lib/posts/types";
import { Comment } from "@/components/posts/Comment";
import { Separator } from "@/components/ui/separator";
import { Tag, DateTag } from "@/components/posts/PostCover";

function MarkdownBody({ markdownHtml }: { markdownHtml: string }) {
    return (
        <div className="markdown-body" dangerouslySetInnerHTML={{ __html: markdownHtml }} />
    )
}


function Title({ title }: { title: string }) {
    return (
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{title}</h1>
    )
}

export default async function Post({ params }) {
    const { postId } = await params;
    const markdownContent: MarkdownType = await getMarkdownContent(postId);

    return (
        <div className="w-full flex flex-col gap-4">
            <Title title={markdownContent.title} />
            <div className="flex flex-row items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-2">
                <Tag tags={markdownContent.tags} />
                <DateTag date={markdownContent.update_date} />
            </div>
            <MarkdownBody markdownHtml={markdownContent.content} />
            <Separator />
            <Comment postId={postId} />
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
