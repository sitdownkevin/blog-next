import { PublicationElementType } from "@/lib/resume/types";


function PublicationElementCard({ publication }: { publication: PublicationElementType }) {
    return (
        <div className="flex flex-row ml-4 gap-4">
            <span className="text-xs">•</span>
            <span className="text-xs text-justify">{publication.content}</span>
        </div>
    )
}
export default function Publications({ publications }: { publications: PublicationElementType[] }) {
    return (
        <div>
            <span className="font-bold text-lg border-b border-gray-300">
                PUBLICATIONS
            </span>
            {publications.map((publication, index) => (
                <PublicationElementCard key={index} publication={publication} />
            ))}
        </div>
    )
}