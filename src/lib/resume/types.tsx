// Basic Info
type NameType = {
    first_name: string;
    last_name: string;
    first_name_en?: string;
    last_name_en?: string;
}

type PhoneType = {
    prefix?: string;
    number: string;
}

export type BasicInfoType = {
    name: NameType;
    email?: string;
    phone?: PhoneType;
    website?: string;
    linkedin?: string;
    github?: string;
}


// Education
export type EducationElementType = {
    school: string;
    location: string;
    degree: string;
    period: string;
    content: string[];
}


// Work Experience
export type WorkExperienceElementType = {
    company: string;
    location: string;
    position: string;
    period: string;
    content: string[];
}


// Project Experience
export type ProjectExperienceElementType = {
    project: string;
    location?: string;
    role?: string;
    period?: string;
    content: string[];
}

// Additional Information
export type AdditionalInformationElementType = {
    title: string;
    content: string;
}

// Publications
export type PublicationElementType = {
    content: string;
}