import Link from "next/link"

export const metadata = {
    title: "My Values",
    description: "Here are some of the values that I believe in",
};

export default function PostLayout({ children }) {
    return (
        <div className="flex flex-col">
            <div className="flex flex-col justify-center items-center p-16 space-y-4">
                <h4 className="transition-transform duration-300 hover:scale-105"><Link href='/me/value'>My Values</Link></h4>
                <span className="text-gray-500 text-xs">Here are some of the values that I believe in</span>

            </div>

            <div>
                {children}
            </div>
        </div>
    )
}