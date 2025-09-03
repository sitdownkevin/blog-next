import { WorkExperienceElementType } from "@/lib/resume/types";

// Define props interface for the single element card
interface WorkExperienceElementCardProps {
    workExperienceElement: WorkExperienceElementType;
}

function WorkExperienceElementCard({ workExperienceElement }: WorkExperienceElementCardProps) {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-between">
                 {/* Change color class to Orange */}
                <span className="text-xs font-bold text-orange-600 dark:text-orange-400">
                    {workExperienceElement.company}
                </span>
                <span className="text-xs font-bold">
                    {workExperienceElement.location}
                </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between">
                <span className="text-xs italic">{workExperienceElement.position}</span>
                <span className="text-xs italic">{workExperienceElement.period}</span>
            </div>
            {/* Use ul and li for semantic list */}
            <ul className="list-disc list-inside ml-4">
                {workExperienceElement.content.map((item, index) => (
                    <li key={index} className="text-xs text-justify">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

// Define props interface for the main card container
interface WorkExperienceElementsCardProps {
    workExperienceElements: WorkExperienceElementType[];
}

export default function WorkExperienceElementsCard({ workExperienceElements }: WorkExperienceElementsCardProps) {
    return (
        <div className="mt-2"> {/* Add margin top for separation */}
            <span className="font-bold text-lg border-b border-gray-300 block mb-1"> {/* Make title block and add margin bottom */}
                WORK EXPERIENCE
            </span>
            <div className="flex flex-col gap-2 sm:gap-1">
                {workExperienceElements.map((element, index) => (
                    <WorkExperienceElementCard
                        key={index}
                        workExperienceElement={element}
                    />
                ))}
            </div>
        </div>
    );
}
