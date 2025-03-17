import { ProjectExperienceElementType } from "@/lib/resume/types";


function ProjectExperienceElementCard({ projectExperienceElement }: { projectExperienceElement: ProjectExperienceElementType }) {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-between">
                <span className="text-xs font-bold">{projectExperienceElement.project}</span>
                <span className="text-xs font-bold">{projectExperienceElement?.location}</span>
            </div>
            <div className="flex flex-row justify-between">
                <span className="text-xs italic">{projectExperienceElement.role}</span>
                <span className="text-xs italic">{projectExperienceElement.period}</span>
            </div>
            <div className="flex flex-col">
                {projectExperienceElement.content.map((content, index) => (
                    <div key={index} className="flex flex-row ml-4 gap-4">
                        <span className="text-xs">•</span>
                        <span className="text-xs">{content}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function ProjectExperienceElementsCard({ projectExperienceElements }: { projectExperienceElements: ProjectExperienceElementType[] }) {
    return (
        <div>
            <span className="font-bold text-lg border-b border-gray-300">
                PROJECT EXPERIENCE
            </span>
            {projectExperienceElements.map((projectExperienceElement, index) => (
                <ProjectExperienceElementCard key={index} projectExperienceElement={projectExperienceElement} />
            ))}
        </div>
    )
}
