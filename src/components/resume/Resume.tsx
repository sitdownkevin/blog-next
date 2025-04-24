"use client";

import { BasicInfoType, EducationElementType, WorkExperienceElementType, ProjectExperienceElementType, AdditionalInformationElementType, PublicationElementType } from "@/lib/resume/types";
import EducationElementsCard from "@/components/resume/Education";
import Header from "@/components/resume/Header";
import WorkExperienceElementsCard from "@/components/resume/WorkExperience";
import ProjectExperienceElementsCard from "@/components/resume/ProjectExperience";
import AdditionalInformation from "@/components/resume/AdditionalInformation";
import Publications from "@/components/resume/Publications";

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
    publications
}: ResumeProps) {
    // Removed hardcoded data definitions

    return (
        <div className="flex flex-col gap-2 sm:gap-1">
            <div className="">
                <div className="">
                    <div className="flex justify-end mb-4">
                        {/* Placeholder for potential future elements like a download button */}
                    </div>
                    <div className="">
                        {/* Pass props to child components */}
                        <Header basicInfo={basicInfo} />
                        <EducationElementsCard educationElements={educationElements} />
                        <WorkExperienceElementsCard workExperienceElements={workExperienceElements} />
                        <ProjectExperienceElementsCard projectExperienceElements={projectExperienceElements} />
                        <AdditionalInformation additionalInformationElements={additionalInformationElements} />
                        <Publications publications={publications} />
                    </div>
                </div>
            </div>
        </div>
    )
}