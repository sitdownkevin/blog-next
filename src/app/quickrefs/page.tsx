
import { getAllQuickrefData } from "@/lib/RenderQuickrefs";
import { QuickrefCardCover } from "@/components/QuickRefCard";

export const metadata = {
    title: "Ke Xu | Quick Reference",
};

export default async function Posts() {
    const data = getAllQuickrefData();

    // console.log(data);
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.map((item, index) => (<QuickrefCardCover key={item.id} item={item}/>))}
            </div>
        </>
    )
}