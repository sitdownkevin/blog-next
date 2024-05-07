import Link from "next/link"

import utilStyles from '../../styles/util.module.css';

export default function Posts() {
    const quickRefs = ['Brew', 'PyPI', 'Conda', 'Git']
    const quickRefCards = quickRefs.map((name, index) => ({ name: name, key: index }));

    return (
        <>
            <div className={utilStyles.boxLeft}>
                <div className={utilStyles.gridHorizontal}>
                    {quickRefCards.map((card) => (
                        <div className={utilStyles.cardLg} key={card.key}>
                            {/* {card.name} */}
                            <Link href={'/posts/' + card.key} className={utilStyles.link}>{card.name}</Link>
                        </div>
                    ))}
                </div>
            </div>
            
        </>
    )
}