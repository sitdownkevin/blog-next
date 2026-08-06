import { useTranslations } from "next-intl";
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
  const t = useTranslations("Resume");

  return (
    <ResumeSection title={t("education")}>
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
