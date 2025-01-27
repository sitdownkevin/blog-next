import { AdvancedSearchLayout } from "@/components/ClientComponent";

export const metadata = {
    title: "Advanced Search",
    description: "Advanced Search for journal articles",
};

export default function PostLayout({ children }) {
    return (
        <div className="flex flex-col">
            <AdvancedSearchLayout>
                {children}
            </AdvancedSearchLayout>
        </div>
    )
}