const journalsUTD = [
    {
        "title": "Accounting Review",
        "subject area": "Accounting",
        "print issn": "0001-4826",
        "online issn": ""
    },
    {
        "title": "Journal of Accounting and Economics",
        "subject area": "Accounting",
        "print issn": "0165-4101",
        "online issn": ""
    },
    {
        "title": "Journal of Accounting Research",
        "subject area": "Accounting",
        "print issn": "0021-8456",
        "online issn": ""
    },
    {
        "title": "Journal of Finance",
        "subject area": "Finance",
        "print issn": "0022-1082",
        "online issn": ""
    },
    {
        "title": "Journal of Financial Economics",
        "subject area": "Finance",
        "print issn": "0304-405X",
        "online issn": ""
    },
    {
        "title": "Review of Financial Studies",
        "subject area": "Finance",
        "print issn": "0893-9454",
        "online issn": ""
    },
    {
        "title": "Information Systems Research",
        "subject area": "Information Systems",
        "print issn": "1047-7047",
        "online issn": ""
    },
    {
        "title": "INFORMS Journal on Computing",
        "subject area": "Information Systems",
        "print issn": "1091-9856",
        "online issn": ""
    },
    {
        "title": "MIS Quarterly",
        "subject area": "Information Systems",
        "print issn": "0276-7783",
        "online issn": ""
    },
    {
        "title": "Journal of International Business Studies",
        "subject area": "International Business",
        "print issn": "0047-2506",
        "online issn": ""
    },
    {
        "title": "Journal of Consumer Research",
        "subject area": "Marketing",
        "print issn": "0093-5301",
        "online issn": ""
    },
    {
        "title": "Journal of Marketing",
        "subject area": "Marketing",
        "print issn": "0022-2429",
        "online issn": ""
    },
    {
        "title": "Journal of Marketing Research",
        "subject area": "Marketing",
        "print issn": "0022-2437",
        "online issn": ""
    },
    {
        "title": "Marketing Science",
        "subject area": "Marketing",
        "print issn": "0732-2399",
        "online issn": ""
    },
    {
        "title": "Academy of Management Journal",
        "subject area": "Management",
        "print issn": "0001-4273",
        "online issn": ""
    },
    {
        "title": "Academy of Management Review",
        "subject area": "Management",
        "print issn": "0363-7425",
        "online issn": ""
    },
    {
        "title": "Administrative Science Quarterly",
        "subject area": "Management",
        "print issn": "0001-8392",
        "online issn": ""
    },
    {
        "title": "Management Science",
        "subject area": "Management",
        "print issn": "0025-1909",
        "online issn": ""
    },
    {
        "title": "Strategic Management Journal",
        "subject area": "Management",
        "print issn": "0143-2095",
        "online issn": ""
    },
    {
        "title": "Journal of Operations Management",
        "subject area": "Operations",
        "print issn": "0272-6963",
        "online issn": ""
    },
    {
        "title": "Manufacturing & Service Operations Management",
        "subject area": "Operations",
        "print issn": "1523-4614",
        "online issn": ""
    },
    {
        "title": "Operations Research",
        "subject area": "Operations",
        "print issn": "0030-364X",
        "online issn": ""
    },
    {
        "title": "Production and Operations Management",
        "subject area": "Operations",
        "print issn": "1059-1478",
        "online issn": ""
    },
    {
        "title": "Organization Science",
        "subject area": "Organizational Behaviour",
        "print issn": "1047-7039",
        "online issn": ""
    }
];


import { JournalClause } from "@/components/JournalClause";
import { JournalTable } from "@/components/JournalTable";
import Link from "next/link";

export default function Page() {
    return (
        <div className="flex flex-col items-center">
            <div className="p-8">
                <Link href={`https://jsom.utdallas.edu/the-utd-top-100-business-school-research-rankings/`}
                    className="text-blue-500 hover:underline hover:text-blue-700"
                    target="_blank"
                >
                    The UTD Top 100 Business School Research Rankings
                </Link>
            </div>
            <JournalClause journals={journalsUTD} caption={"Scopus - UTD24"} />
            <JournalTable journals={journalsUTD} tableCaption={"UTD24"}/>
        </div>
    )
}