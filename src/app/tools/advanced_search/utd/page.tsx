import Link from "next/link";
import { JournalClause } from "@/components/JournalClause";
import { JournalTable } from "@/components/JournalTable";
import { JournalType, DescriptionType } from "@/lib/types";

const journals: JournalType[] = [
  {
    title: "Accounting Review",
    subjectArea: "Accounting",
    printIssn: "0001-4826",
    onlineIssn: "",
  },
  {
    title: "Journal of Accounting and Economics",
    subjectArea: "Accounting",
    printIssn: "0165-4101",
    onlineIssn: "",
  },
  {
    title: "Journal of Accounting Research",
    subjectArea: "Accounting",
    printIssn: "0021-8456",
    onlineIssn: "",
  },
  {
    title: "Journal of Finance",
    subjectArea: "Finance",
    printIssn: "0022-1082",
    onlineIssn: "",
  },
  {
    title: "Journal of Financial Economics",
    subjectArea: "Finance",
    printIssn: "0304-405X",
    onlineIssn: "",
  },
  {
    title: "Review of Financial Studies",
    subjectArea: "Finance",
    printIssn: "0893-9454",
    onlineIssn: "",
  },
  {
    title: "Information Systems Research",
    subjectArea: "Information Systems",
    printIssn: "1047-7047",
    onlineIssn: "",
  },
  {
    title: "INFORMS Journal on Computing",
    subjectArea: "Information Systems",
    printIssn: "1091-9856",
    onlineIssn: "",
  },
  {
    title: "MIS Quarterly",
    subjectArea: "Information Systems",
    printIssn: "0276-7783",
    onlineIssn: "",
  },
  {
    title: "Journal of International Business Studies",
    subjectArea: "International Business",
    printIssn: "0047-2506",
    onlineIssn: "",
  },
  {
    title: "Journal of Consumer Research",
    subjectArea: "Marketing",
    printIssn: "0093-5301",
    onlineIssn: "",
  },
  {
    title: "Journal of Marketing",
    subjectArea: "Marketing",
    printIssn: "0022-2429",
    onlineIssn: "",
  },
  {
    title: "Journal of Marketing Research",
    subjectArea: "Marketing",
    printIssn: "0022-2437",
    onlineIssn: "",
  },
  {
    title: "Marketing Science",
    subjectArea: "Marketing",
    printIssn: "0732-2399",
    onlineIssn: "",
  },
  {
    title: "Academy of Management Journal",
    subjectArea: "Management",
    printIssn: "0001-4273",
    onlineIssn: "",
  },
  {
    title: "Academy of Management Review",
    subjectArea: "Management",
    printIssn: "0363-7425",
    onlineIssn: "",
  },
  {
    title: "Administrative Science Quarterly",
    subjectArea: "Management",
    printIssn: "0001-8392",
    onlineIssn: "",
  },
  {
    title: "Management Science",
    subjectArea: "Management",
    printIssn: "0025-1909",
    onlineIssn: "",
  },
  {
    title: "Strategic Management Journal",
    subjectArea: "Management",
    printIssn: "0143-2095",
    onlineIssn: "",
  },
  {
    title: "Journal of Operations Management",
    subjectArea: "Operations",
    printIssn: "0272-6963",
    onlineIssn: "",
  },
  {
    title: "Manufacturing & Service Operations Management",
    subjectArea: "Operations",
    printIssn: "1523-4614",
    onlineIssn: "",
  },
  {
    title: "Operations Research",
    subjectArea: "Operations",
    printIssn: "0030-364X",
    onlineIssn: "",
  },
  {
    title: "Production and Operations Management",
    subjectArea: "Operations",
    printIssn: "1059-1478",
    onlineIssn: "",
  },
  {
    title: "Organization Science",
    subjectArea: "Organizational Behaviour",
    printIssn: "1047-7039",
    onlineIssn: "",
  },
];

const description: DescriptionType = {
  title: "The UTD Top 100 Business School Research Rankings",
  link: "https://jsom.utdallas.edu/the-utd-top-100-business-school-research-rankings/",
};


function DescriptionCard({ description }: { description: DescriptionType }) {
  return (
    <div className="w-full p-4 flex justify-center items-center">
      <Link
        href={description.link}
        className="text-gray-500 hover:underline hover:text-gray-700"
        target="_blank"
      >
        {description.title}
      </Link>
    </div>
  );
}


export default function Page() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <DescriptionCard description={description} />
      <JournalClause journals={journals} caption={"Scopus - UTD24"} />
      <JournalTable journals={journals} tableCaption={"UTD24"} />
    </div>
  );
}
