import Link from "next/link"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button, buttonVariants } from "@/components/ui/button";

export function QuickrefCardCover({ item }) {
    return (
        <div className="flex flex-col justify-center items-center p-4 rounded-md border border-gray-300">
            <Link href={`/quickrefs/${item.id}`} className="font-bold text-sm">{item.name}</Link>
        </div>
    )
}


export function QuickrefCardPopOver({ content }) {
    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="font-bold text-sm">{content.title}</Button>
                </PopoverTrigger>
                <PopoverContent className="">
                    <div>
                        {/* <h3><Link href={`/quickrefs/${content.id}`}>{ content.title }</Link></h3> */}
                        <Link className={buttonVariants({ variant: "outline" })} href={`/quickrefs/${content.id}`}>{`Expand`}</Link>
                        <div className="markdownContainer mt-8 h-64 overflow-y-auto">
                            <div dangerouslySetInnerHTML={{ __html: content.contentHtml }}></div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </>
    )
}

export function QuickrefCard({ content }) {
    return (
        <div className="flex flex-col w-full">
            <h1 className='text-4xl sm:text-5xl md:text-6xl'>{content.title}</h1>
            <div className='mt-16 markdownContainer'>
                <div dangerouslySetInnerHTML={{ __html: content.contentHtml }}></div>
            </div>
        </div>
    )
}