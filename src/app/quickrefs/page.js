
import { getAllQuickrefData, getQuickrefContent } from "@/lib/RenderQuickrefs";

import { QuickrefCardCover, QuickrefCard } from "@/components/QuickRefCard";

export default async function Posts() {
    const data = getAllQuickrefData();

    const contents = [];
    for (var i=0; i<data.length; i++) {
        console.log(data[i].id);
        contents.push(await getQuickrefContent({ id: data[i].id }));
    }
 

    return (
        <>
            <div className="grid grid-cols-1 lg-grid-cols-2 gap-4">
                {/* {data.map((item) => (<QuickrefCardCover key={item.id} item={item}/>))} */}
                {contents.map(content => {
                    return <>
                        <div className="w-full h-96 overflow-x-scroll p-8 rounded-lg border border-gray-200">
                            <QuickrefCard key={content.id} content={content}/>
                        </div>
                    </>
                })}
            </div>
        </>
    )
}