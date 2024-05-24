export const metadata = {
    title: '毕业卖闲置啦！'
}

export default function SellEverythingLayout({ children }) {
    return (
        <div>
            <header className="text-center p-16">
                <h1 className="text-gray-500">从 SCUPI 毕业啦！出闲置啦！</h1>
                <div className="mt-16">
                    <p>物品的详细信息见</p>
                    <h3 className="mt-4">
                        <a className="text-blue-500 underline" href="https://docs.qq.com/sheet/DWWJ0dmlpcGxRUkRn">腾讯文档</a>
                    </h3>
                </div>
            </header>
            <div>
                {children}
            </div>
        </div>
    )
}