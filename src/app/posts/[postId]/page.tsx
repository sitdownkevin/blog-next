import { getMatterList } from "@/lib/posts/getMatterList";
import { getMarkdownContent } from "@/lib/posts/getMarkdownContent";
import { MarkdownType } from "@/lib/posts/types";


function MarkdownBody({ markdownHtml }: { markdownHtml: string }) {
    return (
        <div className="markdown-body" dangerouslySetInnerHTML={{ __html: markdownHtml }} />
    )
}


function Title({ title }: { title: string }) {
    return (
        <h1>{title}</h1>
    )
}


export default async function Post({ params }) {
    const { postId } = await params;
    const markdownContent: MarkdownType = await getMarkdownContent(postId);

    return (
        <div className="w-full flex flex-col gap-4">
            <Title title={markdownContent.title} />
            <MarkdownBody markdownHtml={markdownContent.content} />
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
