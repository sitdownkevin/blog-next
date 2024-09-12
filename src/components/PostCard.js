import Link from 'next/link';
import { PostCardHeader } from '@/components/ClientComponent';
import { Badge } from '@/components/ui/badge';

function PostCardCover({ post }) {
    return (
        <>
            <Link href={`posts/${post.id}`} className="block">
                <div className="flex flex-col p-8 w-full mb-4 border rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-sm hover:shadow-gray-500/50  ">
                    <h1 className='text-2xl sm:text-3xl md:text-4xl overflow-hidden whitespace-nowrap text-ellipsis transition-all duration-300'>{post.title}</h1>
                    <div className='mt-4 flex flex-row items-center flex-wrap'>
                        {post.tagList.map(tag => (
                            <span key={tag} className="mr-4 mt-2 text-gray-500 px-3 py-1 text-xs border border-gray-500 font-mono rounded-sm transition-all duration-300">{tag}</span>
                        ))}
                    </div>
                </div>
            </Link>
        </>
    )
}


function PostCard({ post }) {


    return (
        <>
            <PostCardHeader title={post.title} />
            <div className='mt-4 mb-4 flex flex-row items-center'>
                {post.tagList.map(tag => (
                    <span key={tag} className="mr-4 mt-2 text-gray-500 px-3 py-1 text-xs border border-gray-500 font-mono rounded-sm transition-all duration-300">{tag}</span>
                ))}
            </div>
            <div className='mt-16 markdown-body'>
                <div dangerouslySetInnerHTML={{ __html: post.contentHtml }}></div>
            </div>
        </>
    )
}




export { PostCard, PostCardCover };