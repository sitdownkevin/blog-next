import { PublicationElementType } from "@/lib/resume/types";

// Define props interface for the single element card
interface PublicationElementCardProps {
    publication: PublicationElementType;
}

// Render as a list item (li)
function PublicationElementCard({ publication }: PublicationElementCardProps) {
    return (
        <li className="text-xs text-justify"> {/* Use li and apply text styles */}
            {publication.content}
        </li>
    );
}

// Define props interface for the main container
interface PublicationsProps {
    publications: PublicationElementType[];
}

export default function Publications({ publications }: PublicationsProps) {
    return (
        <div className="mt-2"> {/* Add margin top for separation */}
            <span className="font-bold text-lg border-b border-gray-300 block mb-1"> {/* Make title block and add margin bottom */}
                PUBLICATIONS
            </span>
            {/* Use ul for the list */}
            <ul className="list-disc list-inside ml-4 flex flex-col gap-1"> {/* Add list styles and gap */}
                {publications.map((pub, index) => (
                    <PublicationElementCard key={index} publication={pub} />
                ))}
            </ul>
        </div>
    );
}
