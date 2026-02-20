import { EducationElementType } from "@/lib/resume/types";

// Define props interface for the single element card
interface EducationElementCardProps {
  educationElement: EducationElementType;
}

function EducationElementCard({ educationElement }: EducationElementCardProps) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        {/* Change color class to Amber */}
        <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
          {educationElement.school}
        </span>
        <span className="text-xs font-bold">{educationElement.location}</span>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <span className="text-xs italic">{educationElement.degree}</span>
        <span className="text-xs italic">{educationElement.period}</span>
      </div>
      {/* Use ul and li for semantic list */}
      <ul className="list-disc list-inside ml-4">
        {educationElement.content.map((item, index) => (
          <li key={index} className="text-xs text-justify">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Define props interface for the main card container
interface EducationElementsCardProps {
  educationElements: EducationElementType[];
}

export default function EducationElementsCard({
  educationElements,
}: EducationElementsCardProps) {
  return (
    <div className="mt-2">
      {" "}
      {/* Add some margin top for separation */}
      <span className="font-bold text-lg border-b border-gray-300 block mb-1">
        {" "}
        {/* Make title block and add margin bottom */}
        EDUCATION
      </span>
      <div className="flex flex-col gap-2 sm:gap-1">
        {educationElements.map((element, index) => (
          <EducationElementCard key={index} educationElement={element} />
        ))}
      </div>
    </div>
  );
}
