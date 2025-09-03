import Resume from "@/components/features/resume/Resume";
// Import the resume data
import {
    basicInfo,
    educationElements,
    workExperienceElements,
    projectExperienceElements,
    additionalInformationElements,
    publications
} from "@/lib/resume/data";

export default function Page() {
    return (
        // Add width constraints to the existing container div
        <div className="w-5/6 md:w-2/3 lg:w-1/2 mx-auto">
            {/* Pass the imported data as props to the Resume component */}
            <Resume
                basicInfo={basicInfo}
                educationElements={educationElements}
                workExperienceElements={workExperienceElements}
                projectExperienceElements={projectExperienceElements}
                additionalInformationElements={additionalInformationElements}
                publications={publications}
            />
        </div>
    );
}