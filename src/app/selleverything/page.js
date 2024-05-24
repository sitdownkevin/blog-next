import { getData } from "./data"


function ItemCard({ itemdata }) {
    const typeColors = {
        textbook: 'text-blue-700',
        item: 'text-red-500',
        book: 'text-green-500',
    }

    const typeNames = {
        textbook: '教科书',
        book: '普通书',
        item: '物品',
    }


    return (
        <div className="bg-white shadow-lg rounded-lg p-6 border border-blue-200">
            <h2 className={`text-2xl font-bold ${typeColors[itemdata.type]} truncate w-full`}>{itemdata.name}</h2>
            <p className="text-gray-700">{itemdata.comment}</p>
            <div className="grid grid-cols-4 mt-4">
                <div>
                    <h4>类型</h4>
                    <p className={`${typeColors[itemdata.type]}}`}>{typeNames[itemdata.type]}</p>
                </div>
                <div>
                    <h4>价格</h4>
                    <p className="text-gray-700">{itemdata.price}</p>
                </div>
                <div className="col-span-2">
                    <h4>QQ</h4>
                    <p className="text-gray-700">{itemdata.contact}</p>
                </div>
            </div>
        </div>
    )
}


export default async function SellEverything() {
    const data = await getData();

    return (
        <>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                {data.map(itemdata => <ItemCard itemdata={itemdata} key={itemdata.id} />)}
            </div>
        </>
    )
}