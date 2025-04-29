import Resume from "@/components/resume/Resume";
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
        <div className="container mx-auto px-4 py-8 w-5/6 md:w-2/3 lg:w-1/2">
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