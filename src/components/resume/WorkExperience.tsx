import { WorkExperienceElementType } from "@/lib/resume/types";

function WorkExperienceElementCard({ workExperienceElement }: { workExperienceElement: WorkExperienceElementType }) {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-between">
                <span className="text-xs font-bold">{workExperienceElement.company}</span>
                <span className="text-xs font-bold">{workExperienceElement.location}</span>
            </div>
            <div className="flex flex-row justify-between">
                <span className="text-xs italic">{workExperienceElement.position}</span>
                <span className="text-xs italic">{workExperienceElement.period}</span>
            </div>
            <div className="flex flex-col">
                {workExperienceElement.content.map((content, index) => (
                    <div key={index} className="flex flex-row ml-4 gap-4">
                        <span className="text-xs">•</span>
                        <span className="text-xs">{content}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function WorkExperienceElementsCard({ workExperienceElements }: { workExperienceElements: WorkExperienceElementType[] }) {
    return (
        <div>
            <span className="font-bold text-lg border-b border-gray-300">
                WORK EXPERIENCE
            </span>
            {workExperienceElements.map((workExperienceElement, index) => (
                <WorkExperienceElementCard key={index} workExperienceElement={workExperienceElement} />
            ))}
        </div>
    )
}