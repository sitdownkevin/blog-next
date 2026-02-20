export type JournalType = {
  title: string;
  subjectArea?: string;
  printIssn?: string;
  onlineIssn?: string;
};

export type DescriptionType = {
  title: string;
  link: string;
};

export type MenubarItem = {
  title: string;
  item: boolean;
  href?: string;
  description?: string;
  alias?: string;
  subItems?: MenubarItem[];
};
