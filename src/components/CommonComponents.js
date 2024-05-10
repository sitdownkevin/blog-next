import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"


export function H({ level, content }) {
    return (
        <div className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {content}
        </div>
    )
}


export function BackTo({ path, title }) {
    return (
        <>
            <Link className={buttonVariants({ variant: "outline" })} href={path}>{`<- Back to ${title}`}</Link>
        </>
    )
}