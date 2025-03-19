import Link from 'next/link';

export default function PostLayout({ children }) {
    return (
        <div className="flex flex-col">
            <div className="flex flex-col justify-center items-center p-16">
                <h4 className="transition-transform duration-300 hover:scale-105"><Link href='/posts'>Posts</Link></h4>
            </div>

            <div>
                {children}
            </div>
        </div>
    )
}