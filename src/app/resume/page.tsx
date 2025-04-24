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
        <div className="container mx-auto px-4 py-8">
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