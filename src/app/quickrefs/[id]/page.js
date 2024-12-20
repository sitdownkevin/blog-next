
import { getAllQuickrefData, getQuickrefContent } from "@/lib/RenderQuickrefs";
import { QuickrefCard } from "@/components/QuickRefCard";

export const dynamicParams = false;

export default async function Post({ params }) {
    const { id } = await params;
    const content = await getQuickrefContent({ id });

    return (
        <QuickrefCard content={content}/>
    )
}

export async function generateStaticParams() {
    const data = getAllQuickrefData();

    return data.map((item) => {
        return { id: item.id }
    })
}