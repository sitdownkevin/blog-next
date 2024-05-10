import { BackTo } from '@/components/CommonComponents'
import Link from 'next/link'


export default function PostLayout({ children }) {
    return (
        <div className="flex flex-col">
            <div className="flex flex-col justify-center items-center p-16">
                <h3><Link href='/posts'>Posts</Link></h3>
            </div>
            
            <div>
                {children}
            </div>
            
            <div className='mt-4'>
                <BackTo path='/' title='home'/>
            </div>
            
        </div>
    )
}