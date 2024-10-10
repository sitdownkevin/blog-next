
import Link from "next/link"



export default async function HiddenPage() {
    let data = await fetch(
        "https://api.kexu567.xyz/get_all_records",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-cache",
        }
    )
    let records = await data.json()
    console.log(records)

    return (
        <div className="flex flex-col space-y-2">
            <h1>{records.length} Records</h1>

            <div>
                <h2>Last 5 Records</h2>
                <ul>
                    {records.reverse().slice(0, 5).map((record, index) => (
                        <li key={index}>{(new Date(record.ClickTs)).toLocaleString()} {record.Domain}</li>
                    ))}
                </ul>
            </div>

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