import { getData } from "./data"
import { ItemCard } from "./ItemCard";


export default async function SellEverything() {
    const data = await getData();

    return (
        <>
            {/* <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                {data.map(itemdata => <ItemCard itemdata={itemdata} key={itemdata.id} />)}
            </div> */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.map(itemdata => <ItemCard itemdata={itemdata} key={itemdata.id} />)}
            </div>
        </>
    )
}