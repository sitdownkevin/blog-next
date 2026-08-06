import { useTranslations } from "next-intl";
import { AdditionalInformationElementType } from "@/lib/resume/types";
import { ResumeSection } from "./resume-section";

interface AdditionalInformationProps {
  additionalInformationElements: AdditionalInformationElementType[];
}

export default function AdditionalInformation({
  additionalInformationElements,
}: AdditionalInformationProps) {
  const t = useTranslations("Resume");

  return (
    <ResumeSection title={t("additionalInformation")}>
      <dl className="flex flex-col">
        {additionalInformationElements.map((element, index) => (
          <div
            key={`${element.title}-${index}`}
            className="grid grid-cols-1 sm:grid-cols-[10rem_1fr] gap-1 sm:gap-6 py-3 border-b border-border last:border-b-0 last:pb-0 first:pt-0"
          >
            <dt className="text-sm font-medium text-foreground">
              {element.title}
            </dt>
            <dd className="text-sm text-muted-foreground leading-relaxed">
              {element.content}
            </dd>
          </div>
        ))}
      </dl>
    </ResumeSection>
  );
}
