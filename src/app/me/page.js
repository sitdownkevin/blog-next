
import Link from "next/link"



export default async function HiddenPage() {



    return (
        <div className="flex flex-col space-y-2">
            <Link href={`/kexu/wechat`}>
                <div className="w-full py-3 flex flex-col items-center justify-center border-2 border-gray-500 hover:bg-gray-400 ">
                    <h1>Wechat</h1>
                </div>
            </Link>

            <Link href={`/kexu/schedule`}>
                <div className="w-full py-3 flex flex-col items-center justify-center border-2 border-gray-500 hover:bg-gray-400 ">
                    <h1>Schedule</h1>
                </div>
            </Link>
        </div>
    )
}