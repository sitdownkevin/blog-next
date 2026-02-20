import { AdditionalInformationElementType } from "@/lib/resume/types";

// Define props interface for the single element card
interface AdditionalInformationElementCardProps {
  additionalInformationElement: AdditionalInformationElementType;
}

// Render as a list item (li)
function AdditionalInformationElementCard({
  additionalInformationElement,
}: AdditionalInformationElementCardProps) {
  return (
    <li className="text-xs">
      {" "}
      {/* Use li and apply text-xs here */}
      <span className="italic">{additionalInformationElement.title}</span>:{" "}
      {additionalInformationElement.content}
    </li>
  );
}

// Define props interface for the main container
interface AdditionalInformationProps {
  additionalInformationElements: AdditionalInformationElementType[];
}

export default function AdditionalInformation({
  additionalInformationElements,
}: AdditionalInformationProps) {
  return (
    <div className="mt-2">
      {" "}
      {/* Add margin top for separation */}
      <span className="font-bold text-lg border-b border-gray-300 block mb-1">
        {" "}
        {/* Make title block and add margin bottom */}
        ADDITIONAL INFORMATION
      </span>
      {/* Use ul for the list */}
      <ul className="list-disc list-inside ml-4 flex flex-col gap-1">
        {" "}
        {/* Add list styles and gap */}
        {additionalInformationElements.map((element, index) => (
          <AdditionalInformationElementCard
            key={index}
            additionalInformationElement={element}
          />
        ))}
      </ul>
    </div>
  );
}
