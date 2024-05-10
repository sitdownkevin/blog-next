import utilStyles from '../../styles/util.module.css'
import { BackToHome } from '@/components/UtilComponent'



export default function PostLayout({ children }) {
    return (
        <div className={utilStyles.gridVertical}>
            <div className={utilStyles.boxCenter}>
                <h2 className='text-2xl font-bold'>Posts</h2>
            </div>
            
            <div className={utilStyles.boxLeft}>
                {children}
            </div>
            
            <div style={{paddingTop: '20px', paddingBottom: '20px'}}>
                <BackToHome />
            </div>
            
        </div>
    )
}