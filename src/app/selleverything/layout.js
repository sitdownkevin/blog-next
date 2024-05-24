import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"


export const metadata = {
    title: 'SCUPI 大四 卖闲置啦'
}

export default function SellEverythingLayout({ children }) {
    return (
        <div className="">
            <header className="text-center p-16">
                <h2 className="font-serif tracking-tight text-gray-500 select-none">
                    从 SCUPI 毕业啦~
                </h2>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <p className="select-none">物品的图片和详情见</p>
                        <h3 className="mt-4">
                            <a target="_blank" className="text-blue-500 underline" href="https://docs.qq.com/sheet/DWWJ0dmlpcGxRUkRn">腾讯文档</a>
                        </h3>
                    </div>
                    <div>
                        <p className="select-none">物品的添加、删除联系</p>
                        <h3 className="mt-4">
                            <span className="select-none">QQ: </span><span className="">1361786946</span>
                        </h3>
                    </div>
                </div>
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <Link href={`/selleverything`} className={buttonVariants({ variant: "outline" })}>全部</Link>
                    <Link href={`/selleverything/item`} className={buttonVariants({ variant: "outline" })}>物品</Link>
                    <Link href={`/selleverything/book`} className={buttonVariants({ variant: "outline" })}>普通书</Link>
                    <Link href={`/selleverything/textbook`} className={buttonVariants({ variant: "outline" })}>教科书</Link>
                </div>
            </header>
            <div>
                {children}
            </div>
        </div>
    )
}