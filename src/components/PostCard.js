import Link from 'next/link';

import { Badge } from '@/components/ui/badge'

function PostCardCover({ post }) {
    return (
        <>
            <div className="flex flex-col border border-gray-300 rounded-lg p-8 w-full mb-4">
                <h1 className='text-4xl sm:text-5xl md:text-6xl'><Link href={`posts/${post.id}`}>{post.title}</Link></h1>
                <div className='mt-4 flex flex-row items-center'>
                    {post.tagList.map(tag => (
                        <Badge key={tag} className='mr-4'>{tag}</Badge>
                    ))}
                </div>

            </div>
        </>
    )
}


function PostCard({ post }) {
    return (
        <>
            <div className="sticky top-0 bg-white z-10 py-4 flex animate-slide-down flex-col w-full backdrop-blur-md bg-opacity-90">
                <h1 className='text-3xl sm:text-4xl md:text-5xl'>{post.title}</h1>
            </div>
            <div className='mt-4 flex flex-row items-center'>
                {post.tagList.map(tag => (
                    <Badge key={tag} className='mr-4'>{tag}</Badge>
                ))}
            </div>
            <div className='mt-16 markdownContainer'>
                <div dangerouslySetInnerHTML={{ __html: post.contentHtml }}></div>
            </div>
        </>
    )
}




export { PostCard, PostCardCover };