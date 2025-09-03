import Link from "next/link"

export const metadata = {
    title: "My Values",
    description: "Here are some of the values that I believe in",
};

export default function PostLayout({ children }) {
    return (
        <div className="flex flex-col w-5/6 md:w-2/3 lg:w-1/2 mx-auto mt-8">
            <div>
                {children}
            </div>
        </div>
    )
}