import Link from 'next/link';
import { PostCardHeader } from '@/components/ClientComponent';
import { Badge } from '@/components/ui/badge';

function PostCardCover({ post }) {
    return (
        <>
            <Link href={`posts/${post.id}`} className="block">
                <div className="flex flex-col p-8 w-full mb-4 shadow-md hover:shadow-xl transition-shadow duration-100 animate-slide-down">
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

// function PostCardCover({ post }) {
//     return (
//         <>
//             <div className="flex flex-col border border-gray-300 rounded-lg p-8 w-full mb-4">
//                 <h1 className='text-4xl sm:text-5xl md:text-6xl'><Link href={`posts/${post.id}`}>{post.title}</Link></h1>
//                 <div className='mt-4 flex flex-row items-center'>
//                     {post.tagList.map(tag => (
//                         <Badge key={tag} className='mr-4'>{tag}</Badge>
//                     ))}
//                 </div>

//             </div>
//         </>
//     )
// }


function PostCard({ post }) {


    return (
        <>
            <PostCardHeader title={post.title} />
            <div className='mt-4 flex flex-row items-center'>
                {post.tagList.map(tag => (
                    <span key={tag} className="mr-4 mt-2 text-gray-500 px-3 py-1 text-xs border border-gray-500 font-mono rounded-sm transition-all duration-300">{tag}</span>
                ))}
            </div>
            <div className='mt-16 markdownContainer'>
                <div dangerouslySetInnerHTML={{ __html: post.contentHtml }}></div>
            </div>
        </>
    )
}




export { PostCard, PostCardCover };