

export default function SellEverythingLayout({ children }) {
    return (
        <div>
            <header className="text-center p-16">
                <h1>从 SCUPI 毕业啦！出闲置啦！</h1>
                <div className="mt-16">
                    每件物品的详细信息见腾讯文档：<a href="https://docs.qq.com/sheet/DWWJ0dmlpcGxRUkRn">https://docs.qq.com/sheet/DWWJ0dmlpcGxRUkRn</a>
                </div>
            </header>
            <div>
                { children }
            </div>
        </div>
    )
}