import Link from "next/link"
import utilStyles from "@/styles/util.module.css";


function BackToHome() {
    return (
        <>
            <div className={utilStyles.backToHome}>
            <Link href={'/'} className={utilStyles.link}>
                <div style={{fontSize: '0.8rem', fontWeight: 'bold'}}>
                    {`<- Back to home`}
                </div>
            </Link>
            </div>
        </>
    )
}


export { BackToHome }
