import utilStyles from '../../styles/util.module.css'
import Link from 'next/link';


export default function PostLayout({ children }) {
    return (
        <div className={utilStyles.gridVertical}>
            <div className={utilStyles.boxCenter}>
                <h2>Posts</h2>
            </div>
            <div><Link href={'/'} className={utilStyles.link}>{`<- Back to home`}</Link></div>

            <div className={utilStyles.boxLeft}>
                {children}
            </div>
        </div>
    )
}