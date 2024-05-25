import { Badge } from "@/components/ui/badge"
import Image from "next/image"


export function ItemCardOld({ itemdata }) {
    const typeColors = {
        textbook: 'text-blue-500',
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
                    <p className={`${typeColors[itemdata.type]}}`}>{typeNames[itemdata.type]}</p>
                </div>
                <div>
                    <h4>价格</h4>
                    <p className="text-gray-700">{itemdata.price}</p>
                </div>
                <div className="">
                    <h4>QQ</h4>
                    <p className="text-gray-700">{itemdata.contact}</p>
                </div>
            </div>
        </div>
    )
}



export function ItemCard({ itemdata }) {
    const typeColors = {
        textbook: 'text-blue-500',
        item: 'text-red-500',
        book: 'text-black-500',
    }

    const typeBgColors = {
        textbook: 'bg-red-100',
        item: 'bg-blue-300',
        book: 'bg-gray-300',
    }

    const typeNames = {
        textbook: '教科书',
        book: '普通书',
        item: '物品',
    }


    return (
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <div className="flex flex-col items-center justify-center">
            <Badge className={`${typeColors[itemdata.type]} ${typeBgColors[itemdata.type]}`}>{typeNames[itemdata.type]}</Badge>
            </div>
            <h2 className={`text-xl font-bold truncate whitespace-nowrap mt-4`}>                
                {itemdata.name}
            </h2>

            <div className="flex flex-col justify-left pt-2 w-full">
                <p className="font-serif text-gray-600">{itemdata.comment}</p>
                <div className="grid grid-cols-2 mt-2">
                    <div>{itemdata.price} 元</div>
                    <div className="">QQ: {itemdata.contact}</div>
                </div>
            </div>
        </div>
    )
}
