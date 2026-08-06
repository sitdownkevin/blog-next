export type Location = {
  city: string;
  province: string;
  country: string;
};

export type AbstractLocale = {
  name: { first: string; last: string };
  email: string;
  location: Location;
  role: string;
  intro: string;
};

export type EducationItem = {
  school: string;
  location: Location;
  degree: string;
  period: {
    start: string;
    end: string;
  };
};

export type WorkingExpItem = {
  company: string;
  location: Location;
  position: string;
  period: {
    start: string;
    end: string;
  };
  content: string[];
  tags: string[];
};

export type ProjectItem = {
  project: string;
  location: Location;
  description: string;
  url: string;
  slug?: string;
  featured?: boolean;
};

export type PublicationItem = {
  authors: string;
  year: string;
  title: string;
  journal: string;
  volume: string;
  pages: string;
  url: string;
  summary?: string;
  featured?: boolean;
};

export type LocaleItems<T> = {
  en: { items: T[] };
  zh: { items: T[] };
};

export type LocalePair<T> = {
  en: T;
  zh: T;
};

export type PersonalIntroDocument = {
  abstract: LocalePair<AbstractLocale>;
  education: LocaleItems<EducationItem>;
  workingExp: LocaleItems<WorkingExpItem>;
  projects: LocaleItems<ProjectItem>;
  publications: LocaleItems<PublicationItem>;
};
