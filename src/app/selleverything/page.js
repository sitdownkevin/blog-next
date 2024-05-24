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
        <div className="bg-white shadow-lg rounded-lg p-6 border border-blue-100">

            <h2 className={`text-2xl font-bold ${typeColors[itemdata.type]} truncate whitespace-nowrap`}>{itemdata.name}</h2>

            <p className="text-gray-400">{itemdata.comment}</p>
            <div className="grid grid-cols-4 mt-6">
                <div>
                    <h4>类型</h4>
                    <p className={`ml-2 ${typeColors[itemdata.type]}}`}>{typeNames[itemdata.type]}</p>
                </div>
                <div>
                    <h4>价格</h4>
                    <p className="ml-2 text-gray-700">{itemdata.price}</p>
                </div>
                <div className="">
                    <h4>QQ</h4>
                    <p className="ml-2 text-gray-700">{itemdata.contact}</p>
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