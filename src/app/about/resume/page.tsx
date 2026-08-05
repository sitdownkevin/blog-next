import { Metadata } from "next";
import Resume from "@/components/features/resume/Resume";
import {
  basicInfo,
  educationElements,
  workExperienceElements,
  projectExperienceElements,
  additionalInformationElements,
  publications,
} from "@/lib/resume/data";

export const metadata: Metadata = {
  title: "Resume - Ke Xu's website",
  description:
    "Resume of Ke Xu, Ph.D. candidate in Information Systems at Tongji University.",
  alternates: {
    canonical: "https://kexu.win/about/resume",
  },
};

export default function Page() {
  return (
    <div className="w-full py-8 px-4">
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
