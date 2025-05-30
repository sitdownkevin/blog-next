import Link from 'next/link';
import "@fontsource/maple-mono/700-italic.css";

export default function PostLayout({ children }) {
    return (
        // Add the width constraint wrapper div here
        <div className="w-5/6 md:w-2/3 lg:w-1/2 mx-auto">
            <div className="flex flex-col">
                {/* <div className="flex flex-col justify-center items-center p-16">
                    <h4 className="transition-transform duration-300 hover:scale-105"><Link href='/posts'>Posts</Link></h4>
                </div> */}

                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}