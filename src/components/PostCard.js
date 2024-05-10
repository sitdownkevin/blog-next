import postStyles from '../styles/post.module.css';
import utilStyles from '../styles/util.module.css'
import Link from 'next/link';

function PostCardCover({ post }) {
    return (
        <>
            <div className={postStyles.cardCover}>
                <h1><Link href={`posts/${post.id}`} className={utilStyles.link}>{ post.title }</Link></h1>
                <h3>{ post.tags }</h3>
            </div>
        </>
    )
}


function PostCard({ post }) {
    return (
        <>
            <h1>{ post.title }</h1>
            <h2>{ post.id }</h2>
            <h3>{ post.tags }</h3>
            <div>
                <div dangerouslySetInnerHTML={{ __html: post.contentHtml }}></div>
            </div>
        </>
    )
}





export { PostCard, PostCardCover };