import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"


export function BackTo({ path, title }) {
    return (
        <>
            <Link className={buttonVariants({ variant: "outline" })} href={path}>{`Back to ${title}`}</Link>
        </>
    )
}