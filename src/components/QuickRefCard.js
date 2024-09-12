import Link from "next/link"

import { PostCardHeader } from "@/components/ClientComponent";

export function QuickrefCardCover({ item }) {
    return (
        <>
            <Link href={`/quickrefs/${item.id}`} className="block">
                <div className="flex flex-col p-8 w-full mb-4 border rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-sm hover:shadow-gray-500/50">
                    <h1 className='text-2xl sm:text-3xl md:text-4xl overflow-hidden whitespace-nowrap text-ellipsis transition-all duration-300'>{item.name}</h1>
                </div>
            </Link>
        </>
    )
}


export function QuickrefCard({ content }) {
    return (
        <>
            <PostCardHeader title={content.title}/>
            <div className="mt-16 markdown-body">
                <div dangerouslySetInnerHTML={{ __html: content.contentHtml }}></div>
            </div>
        </>
    )
}