import { WorkExperienceElementType } from "@/lib/resume/types";
import {
  ResumeBulletList,
  ResumeEntry,
  ResumeSection,
} from "./resume-section";

interface WorkExperienceElementsCardProps {
  workExperienceElements: WorkExperienceElementType[];
}

export default function WorkExperienceElementsCard({
  workExperienceElements,
}: WorkExperienceElementsCardProps) {
  return (
    <ResumeSection title="Work experience">
      <div className="flex flex-col">
        {workExperienceElements.map((element, index) => (
          <ResumeEntry
            key={`${element.company}-${index}`}
            primary={element.company}
            secondary={element.position}
            place={element.location}
            period={element.period}
          >
            <ResumeBulletList items={element.content} />
          </ResumeEntry>
        ))}
      </div>
    </ResumeSection>
  );
}
