import Link from "next/link";
import { useTranslations } from "next-intl";
import { ProjectExperienceElementType } from "@/lib/resume/types";
import {
  ResumeBulletList,
  ResumeEntry,
  ResumeSection,
} from "./resume-section";

function looksLikeUrl(value: string) {
  return /^(https?:\/\/|[\w.-]+\.[\w.-]+)/i.test(value);
}

function toHref(value: string) {
  return value.startsWith("http") ? value : `https://${value}`;
}

interface ProjectExperienceElementsCardProps {
  projectExperienceElements: ProjectExperienceElementType[];
}

export default function ProjectExperienceElementsCard({
  projectExperienceElements,
}: ProjectExperienceElementsCardProps) {
  const t = useTranslations("Resume");

  return (
    <ResumeSection title={t("projects")}>
      <div className="flex flex-col">
        {projectExperienceElements.map((element, index) => {
          const roleIsLink = !!element.role && looksLikeUrl(element.role);

          return (
            <ResumeEntry
              key={`${element.project}-${index}`}
              primary={element.project}
              secondary={roleIsLink ? undefined : element.role}
              place={element.location || undefined}
              period={element.period || undefined}
            >
              {roleIsLink ? (
                <Link
                  href={toHref(element.role!)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-claude-orange hover:underline w-fit"
                >
                  {element.role}
                </Link>
              ) : null}
              <ResumeBulletList items={element.content} />
            </ResumeEntry>
          );
        })}
      </div>
    </ResumeSection>
  );
}
