import Link from "next/link"

export const metadata = {
    title: "Gallery",
    description: "This is the gallery page.",
};

export default function PostLayout({ children }) {
    return (
        <div className="flex flex-col">
            <div className="flex flex-col justify-center items-center p-16">
                <h4 className="transition-transform duration-300 hover:scale-105"><Link href='/me/gallery'>Gallery</Link></h4>
            </div>

            <div>
                {children}
            </div>
        </div>
    )
}