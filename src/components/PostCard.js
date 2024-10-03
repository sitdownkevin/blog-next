

import Link from 'next/link';
import { PostCardHeader } from '@/components/ClientComponent';


function Tags({ tagList }) {
    return <>
        <div className='flex flex-row items-center flex-wrap'>
            {tagList.map(tag => (
                <span key={tag} 
                className="mr-4 mt-4 px-3 py-1 
                text-gray-400 text-xs 
                rounded-lg border-2 border-gray-300 
                font-black transition-all duration-300 
                hover:text-black hover:border-gray-500 hover:scale-105">{tag}</span>
            ))}
        </div>
    </>
}


function PostCardCover({ post }) {
    return (
        <>
            <Link href={`posts/${post.id}`} className="block">
                <div className="flex flex-col p-8 w-full mb-4 border rounded-lg
                transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-500/50  ">
                    <h1 className='text-2xl sm:text-3xl md:text-4xl overflow-hidden whitespace-nowrap text-ellipsis transition-all duration-300'>{post.title}</h1>
                    <Tags tagList={post.tagList} />
                </div>
            </Link>
        </>
    )
}

function PostCard({ post }) {

    return (
        <div className="flex flex-col items-start justify-center">
            <PostCardHeader title={post.title} />
            <div className='mb-4'>
                <Tags tagList={post.tagList} />
            </div>
            <div className='w-full markdown-body'>
                <div dangerouslySetInnerHTML={{ __html: post.contentHtml }}></div>
            </div>
        </div>
    )
}




export { PostCard, PostCardCover };