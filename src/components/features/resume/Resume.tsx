"use client";

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

// Define the props interface for the Resume component
interface ResumeProps {
  basicInfo: BasicInfoType;
  educationElements: EducationElementType[];
  workExperienceElements: WorkExperienceElementType[];
  projectExperienceElements: ProjectExperienceElementType[];
  additionalInformationElements: AdditionalInformationElementType[];
  publications: PublicationElementType[];
}

// Update the component to accept props
export default function Resume({
  basicInfo,
  educationElements,
  workExperienceElements,
  projectExperienceElements,
  additionalInformationElements,
  publications,
}: ResumeProps) {
  // Removed hardcoded data definitions

  return (
    <div className="flex flex-col gap-2 sm:gap-1">
      <div>
        {/* Pass props to child components */}
        <Header basicInfo={basicInfo} />
        <EducationElementsCard educationElements={educationElements} />
        <WorkExperienceElementsCard
          workExperienceElements={workExperienceElements}
        />
        <ProjectExperienceElementsCard
          projectExperienceElements={projectExperienceElements}
        />
        <AdditionalInformation
          additionalInformationElements={additionalInformationElements}
        />
        <Publications publications={publications} />
      </div>
    </div>
  );
}
