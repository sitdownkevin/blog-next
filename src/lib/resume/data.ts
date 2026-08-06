import {
  BasicInfoType,
  EducationElementType,
  WorkExperienceElementType,
  ProjectExperienceElementType,
  AdditionalInformationElementType,
  PublicationElementType,
} from "@/lib/resume/types";
import type { AppLocale } from "@/i18n/routing";

export type ResumeLocaleData = {
  basicInfo: BasicInfoType;
  educationElements: EducationElementType[];
  workExperienceElements: WorkExperienceElementType[];
  projectExperienceElements: ProjectExperienceElementType[];
  additionalInformationElements: AdditionalInformationElementType[];
  publications: PublicationElementType[];
};

export type ResumeDocument = Record<AppLocale, ResumeLocaleData>;
