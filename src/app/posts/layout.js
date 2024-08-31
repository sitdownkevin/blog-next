
import Link from 'next/link'


export default function PostLayout({ children }) {
    return (
        <div className="flex flex-col">
            <div className="flex flex-col justify-center items-center p-16">
                <h4><Link href='/posts'>Posts</Link></h4>
            </div>
            
            <div>
                {children}
            </div>
        </div>
    )
}