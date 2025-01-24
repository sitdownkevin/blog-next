import { JournalClause } from "@/components/JournalClause";
import { JournalTable } from "@/components/JournalTable";
import Link from "next/link";

const journalsFT = [
    {
        "title": "Accounting Review",
        "subject area": "Accounting",
        "print issn": "0001-4826",
        "online issn": ""
    },
    {
        "title": "Accounting, Organizations and Society",
        "subject area": "Accounting",
        "print issn": "0361-3682",
        "online issn": ""
    },
    {
        "title": "Contemporary Accounting Research",
        "subject area": "Accounting",
        "print issn": "0823-9150",
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
        "title": "Review of Accounting Studies",
        "subject area": "Accounting",
        "print issn": "1380-6653",
        "online issn": ""
    },
    {
        "title": "American Economic Review",
        "subject area": "Economics",
        "print issn": "0002-8282",
        "online issn": ""
    },
    {
        "title": "Econometrica",
        "subject area": "Economics",
        "print issn": "0012-9682",
        "online issn": ""
    },
    {
        "title": "Journal of Political Economy",
        "subject area": "Economics",
        "print issn": "0022-3808",
        "online issn": ""
    },
    {
        "title": "Quarterly Journal of Economics",
        "subject area": "Economics",
        "print issn": "0033-5533",
        "online issn": ""
    },
    {
        "title": "Research Policy",
        "subject area": "Economics, Management",
        "print issn": "0048-7333",
        "online issn": ""
    },
    {
        "title": "Review of Economic Studies",
        "subject area": "Economics",
        "print issn": "0034-6527",
        "online issn": ""
    },
    {
        "title": "Entrepreneurship Theory and Practice",
        "subject area": "Entrepreneurship",
        "print issn": "1042-2587",
        "online issn": ""
    },
    {
        "title": "Journal of Business Venturing",
        "subject area": "Entrepreneurship",
        "print issn": "0883-9026",
        "online issn": ""
    },
    {
        "title": "Strategic Entrepreneurship Journal",
        "subject area": "Entrepreneurship",
        "print issn": "1932-4391",
        "online issn": ""
    },
    {
        "title": "Journal of Business Ethics",
        "subject area": "Ethics",
        "print issn": "0167-4544",
        "online issn": ""
    },
    {
        "title": "Journal of Finance",
        "subject area": "Finance",
        "print issn": "0022-1082",
        "online issn": ""
    },
    {
        "title": "Journal of Financial and Quantitative Analysis",
        "subject area": "Finance",
        "print issn": "0022-1090",
        "online issn": ""
    },
    {
        "title": "Journal of Financial Economics",
        "subject area": "Finance",
        "print issn": "0304-405X",
        "online issn": ""
    },
    {
        "title": "Review of Finance",
        "subject area": "Finance",
        "print issn": "1572-3097",
        "online issn": ""
    },
    {
        "title": "Review of Financial Studies",
        "subject area": "Finance",
        "print issn": "0893-9454",
        "online issn": ""
    },
    {
        "title": "Human Relations",
        "subject area": "Human Resources",
        "print issn": "0018-7267",
        "online issn": "1741-282X"
    },
    {
        "title": "Human Resource Management",
        "subject area": "Human Resources",
        "print issn": "0090-4848",
        "online issn": ""
    },
    {
        "title": "Information Systems Research",
        "subject area": "Information Systems",
        "print issn": "1047-7047",
        "online issn": ""
    },
    {
        "title": "Journal of Management Information Systems",
        "subject area": "Information Systems",
        "print issn": "0742-1222",
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
        "title": "Harvard Business Review",
        "subject area": "Management",
        "print issn": "0017-8012",
        "online issn": ""
    },
    {
        "title": "Journal of Management",
        "subject area": "Management",
        "print issn": "0149-2063",
        "online issn": ""
    },
    {
        "title": "Journal of Management Studies",
        "subject area": "Management",
        "print issn": "0022-2380",
        "online issn": ""
    },
    {
        "title": "Management Science",
        "subject area": "Management",
        "print issn": "0025-1909",
        "online issn": ""
    },
    {
        "title": "MIT Sloan Management Review",
        "subject area": "Management",
        "print issn": "1532-8937",
        "online issn": ""
    },
    {
        "title": "Strategic Management Journal",
        "subject area": "Management",
        "print issn": "0143-2095",
        "online issn": ""
    },
    {
        "title": "Journal of Consumer Psychology",
        "subject area": "Marketing",
        "print issn": "1057-7408",
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
        "title": "Journal of the Academy of Marketing Science",
        "subject area": "Marketing",
        "print issn": "0092-0703",
        "online issn": ""
    },
    {
        "title": "Marketing Science",
        "subject area": "Marketing",
        "print issn": "0732-2399",
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
        "title": "Journal of Applied Psychology",
        "subject area": "Organizational Behaviour",
        "print issn": "0021-9010",
        "online issn": ""
    },
    {
        "title": "Organization Science",
        "subject area": "Organizational Behaviour",
        "print issn": "1047-7039",
        "online issn": ""
    },
    {
        "title": "Organization Studies",
        "subject area": "Organizational Behaviour",
        "print issn": "0170-8406",
        "online issn": ""
    },
    {
        "title": "Organizational Behavior and Human Decision Processes",
        "subject area": "Organizational Behaviour",
        "print issn": "0749-5978",
        "online issn": ""
    }
];

export default function Page() {
    return (
        <div className="flex flex-col items-center">
            <div className="p-8">
                <Link href={`https://www.ft.com/content/3405a512-5cbb-11e1-8f1f-00144feabdc0/`}
                    className="text-blue-500 hover:underline hover:text-blue-700"
                    target="_blank"
                >
                    50 Journals used in FT Research Rank
                </Link>
            </div>
            <JournalClause journals={journalsFT} caption={"Scopus - FT50"} />
            <JournalTable journals={journalsFT} tableCaption={"FT50"} />
        </div>
    )
}