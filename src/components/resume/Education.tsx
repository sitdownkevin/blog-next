import { EducationElementType } from "@/lib/resume/types";

function EducationElementCard({ educationElement }: { educationElement: EducationElementType }) {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-between">
                <span className="text-xs font-bold">{educationElement.school}</span>
                <span className="text-xs font-bold">{educationElement.location}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between">
                <span className="text-xs italic">{educationElement.degree}</span>
                <span className="text-xs italic">{educationElement.period}</span>
            </div>
            <div className="flex flex-col">
                {educationElement.content.map((content, index) => (
                    <div key={index} className="flex flex-row ml-4 gap-4">
                        <span className="text-xs">•</span>
                        <span className="text-xs text-justify">{content}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default function EducationElementsCard({ educationElements }: { educationElements: EducationElementType[] }) {
    return (
        <div>
            <span className="font-bold text-lg border-b border-gray-300">
                EDUCATION
            </span>
            <div className="flex flex-col gap-2 sm:gap-1">
                {educationElements.map((educationElement, index) => (
                    <EducationElementCard key={index} educationElement={educationElement} />
                ))}
            </div>
        </div>
    )
}