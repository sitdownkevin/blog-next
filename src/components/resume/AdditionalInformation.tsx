import { AdditionalInformationElementType } from "@/lib/resume/types";


function AdditionalInformationElementCard({ additionalInformationElement }: { additionalInformationElement: AdditionalInformationElementType }) {   
    return (
        <div className="flex flex-row ml-4 gap-4">
            <span className="text-xs">•</span>
            <span className="text-xs"><span className="italic">{additionalInformationElement.title}</span>: {additionalInformationElement.content}</span>
        </div>
    )
}
export default function AdditionalInformation({ additionalInformationElements }: { additionalInformationElements: AdditionalInformationElementType[] }) {
    return (
        <div>
            <span className="font-bold text-lg border-b border-gray-300">
                ADDITIONAL INFORMATION
            </span>
            {additionalInformationElements.map((additionalInformationElement, index) => (
                <AdditionalInformationElementCard key={index} additionalInformationElement={additionalInformationElement} />
            ))}
        </div>
    )
}