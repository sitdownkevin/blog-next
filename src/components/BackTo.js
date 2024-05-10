import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"

function BackTo({ path, title }) {
    return (
        <>
            <Link className={buttonVariants({ variant: "outline" })} href={path}>{`<- Back to ${title}`}</Link>
        </>
    )
}


export { BackTo }
