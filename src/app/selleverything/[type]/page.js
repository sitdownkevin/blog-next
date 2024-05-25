import { getDataByType } from '@/app/selleverything/data';

export const dynamicParams = false;

import { ItemCard } from '../ItemCard';


export default async function TypePage({ params }) {
    const data = await getDataByType(params.type);

    return (
        <>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                {data.map(itemdata => <ItemCard itemdata={itemdata} key={itemdata.id} />)}
            </div>
        </>
    )
}


export async function generateStaticParams() {
    return [
        { type: 'book' },
        { type: 'textbook' },
        { type: 'item' },
    ]
}