import Link from 'next/link';

import { Badge } from '@/components/ui/badge'

function PostCardCover({ post }) {
    return (
        <>
            <div className="flex flex-col border border-gray-300 rounded-lg p-4 w-full">
                <h2><Link href={`posts/${post.id}`}>{ post.title }</Link></h2>
                <div className='mt-4 flex flex-row justify-between items-center'>
                    <Badge>{ post.tags }</Badge>
                </div>
                
            </div>
        </>
    )
}


function PostCard({ post }) {
    return (
        <>
            <h1>{ post.title }</h1>
            <div className='mt-4 flex flex-row justify-between items-center'>
                    <Badge>{ post.tags }</Badge>
            </div>
            <div className='mt-16'>
                <div dangerouslySetInnerHTML={{ __html: post.contentHtml }}></div>
            </div>
        </>
    )
}





export { PostCard, PostCardCover };