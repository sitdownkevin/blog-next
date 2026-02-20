import Resume from "@/components/features/resume/Resume";
// Import the resume data
import {
  basicInfo,
  educationElements,
  workExperienceElements,
  projectExperienceElements,
  additionalInformationElements,
  publications,
} from "@/lib/resume/data";

export default function Page() {
  return (
    // Add width constraints to the existing container div
    <div className="w-full py-8 px-4">
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
