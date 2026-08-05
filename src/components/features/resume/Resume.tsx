import {
  BasicInfoType,
  EducationElementType,
  WorkExperienceElementType,
  ProjectExperienceElementType,
  AdditionalInformationElementType,
  PublicationElementType,
} from "@/lib/resume/types";
import EducationElementsCard from "./Education";
import Header from "./Header";
import WorkExperienceElementsCard from "./WorkExperience";
import ProjectExperienceElementsCard from "./ProjectExperience";
import AdditionalInformation from "./AdditionalInformation";
import Publications from "./Publications";

interface ResumeProps {
  basicInfo: BasicInfoType;
  educationElements: EducationElementType[];
  workExperienceElements: WorkExperienceElementType[];
  projectExperienceElements: ProjectExperienceElementType[];
  additionalInformationElements: AdditionalInformationElementType[];
  publications: PublicationElementType[];
}

export default function Resume({
  basicInfo,
  educationElements,
  workExperienceElements,
  projectExperienceElements,
  additionalInformationElements,
  publications,
}: ResumeProps) {
  return (
    <div className="flex flex-col gap-12">
      <Header basicInfo={basicInfo} />
      <EducationElementsCard educationElements={educationElements} />
      <Publications publications={publications} />
      <WorkExperienceElementsCard
        workExperienceElements={workExperienceElements}
      />
      <ProjectExperienceElementsCard
        projectExperienceElements={projectExperienceElements}
      />
      <AdditionalInformation
        additionalInformationElements={additionalInformationElements}
      />
    </div>
  );
}
