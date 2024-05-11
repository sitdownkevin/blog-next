import Link from "next/link"

export function QuickrefCardCover({ item }) {
    return (
        <div className="flex flex-col justify-center items-center p-4 rounded-md border border-gray-300">
            <Link href={`/quickrefs/${item.id}`} className="font-bold text-lg">{item.name}</Link>
        </div>
    )
}


export function QuickrefCard({ content }) {
    return (
        <div className="flex flex-col">
            <h1 className='text-6xl'>{ content.title }</h1>
            <div className='mt-16 markdownContainer'>
                <div dangerouslySetInnerHTML={{ __html: content.contentHtml }}></div>
            </div>
        </div>
    )
}