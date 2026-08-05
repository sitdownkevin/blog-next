import { EducationElementType } from "@/lib/resume/types";
import {
  ResumeBulletList,
  ResumeEntry,
  ResumeSection,
} from "./resume-section";

interface EducationElementsCardProps {
  educationElements: EducationElementType[];
}

export default function EducationElementsCard({
  educationElements,
}: EducationElementsCardProps) {
  return (
    <ResumeSection title="Education">
      <div className="flex flex-col">
        {educationElements.map((element, index) => (
          <ResumeEntry
            key={`${element.school}-${index}`}
            primary={element.school}
            secondary={element.degree}
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
