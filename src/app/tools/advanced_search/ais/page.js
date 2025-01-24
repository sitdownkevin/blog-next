import { JournalClause } from "@/components/JournalClause";
import { JournalTable } from "@/components/JournalTable";


const journalesAIS = [
    {
        "title": "Decision Support Systems",
        "subject area": "",
        "print issn": "0167-9236",
        "online issn": ""
    },
    {
        "title": "European Journal of Information Systems",
        "subject area": "",
        "print issn": "0960-085X",
        "online issn": ""
    },
    {
        "title": "Information & Management",
        "subject area": "",
        "print issn": "0378-7206",
        "online issn": ""
    },
    {
        "title": "Information and Organization",
        "subject area": "",
        "print issn": "1471-7727",
        "online issn": ""
    },
    {
        "title": "Information Systems Journal",
        "subject area": "",
        "print issn": "1350-1917",
        "online issn": ""
    },
    {
        "title": "Information Systems Research",
        "subject area": "",
        "print issn": "1047-7047",
        "online issn": ""
    },
    {
        "title": "Journal of the Association for Information Systems",
        "subject area": "",
        "print issn": "1536-9323",
        "online issn": ""
    },
    {
        "title": "Journal of Information Technology",
        "subject area": "",
        "print issn": "0268-3962",
        "online issn": ""
    },
    {
        "title": "Journal of Management Information Systems",
        "subject area": "",
        "print issn": "0742-1222",
        "online issn": ""
    },
    {
        "title": "Journal of Strategic Information Systems",
        "subject area": "",
        "print issn": "0963-8687",
        "online issn": ""
    },
    {
        "title": "MIS Quarterly",
        "subject area": "",
        "print issn": "0276-7783",
        "online issn": ""
    }
];


export default function Page() {
    return (
        <div className="flex flex-col items-center">
            <JournalClause journals={journalesAIS} caption={"Scopus - AIS Bucket"} />
            <JournalTable journals={journalesAIS} tableCaption={"AIS Bucket"} hideSubjectArea={true} />
        </div>
    )
}