import { ProjectExperienceElementType } from "@/lib/resume/types";

// Define props interface for the single element card
interface ProjectExperienceElementCardProps {
  projectExperienceElement: ProjectExperienceElementType;
}

function ProjectExperienceElementCard({
  projectExperienceElement,
}: ProjectExperienceElementCardProps) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        {/* Change color class to Rose */}
        <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
          {projectExperienceElement.project}
        </span>
        {/* Conditionally render location */}
        {projectExperienceElement.location && (
          <span className="text-xs font-bold">
            {projectExperienceElement.location}
          </span>
        )}
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between">
        {/* Conditionally render role */}
        {projectExperienceElement.role && (
          <span className="text-xs italic">
            {projectExperienceElement.role}
          </span>
        )}
        {/* Conditionally render period */}
        {projectExperienceElement.period && (
          <span className="text-xs italic">
            {projectExperienceElement.period}
          </span>
        )}
      </div>
      {/* Use ul and li for semantic list */}
      <ul className="list-disc list-inside ml-4">
        {projectExperienceElement.content.map((item, index) => (
          <li key={index} className="text-xs text-justify">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Define props interface for the main card container
interface ProjectExperienceElementsCardProps {
  projectExperienceElements: ProjectExperienceElementType[];
}

export default function ProjectExperienceElementsCard({
  projectExperienceElements,
}: ProjectExperienceElementsCardProps) {
  return (
    <div className="mt-2">
      {" "}
      {/* Add margin top for separation */}
      <span className="font-bold text-lg border-b border-gray-300 block mb-1">
        {" "}
        {/* Make title block and add margin bottom */}
        PROJECT EXPERIENCE
      </span>
      <div className="flex flex-col gap-2 sm:gap-1">
        {projectExperienceElements.map((element, index) => (
          <ProjectExperienceElementCard
            key={index}
            projectExperienceElement={element}
          />
        ))}
      </div>
    </div>
  );
}
