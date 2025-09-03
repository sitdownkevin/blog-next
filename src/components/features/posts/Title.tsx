import Link from "next/link";


interface TitleProps {
    title: string;
    type: "cover" | "post";
    postId: string | null;
}


export function Title({ title, type, postId }: TitleProps) {

    if (type === "cover") {
        return (
            <div className="text-lg md:text-2xl font-bold truncate hover:opacity-80 select-none">
                <Link
                    href={`/posts/${postId}`}
                    className="hover:underline"
                    title={title}
                >
                    {title}
                </Link>
            </div>
        )
    } else {
        return (
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight lg:text-5xl">{title}</h1>
        )
    }

}