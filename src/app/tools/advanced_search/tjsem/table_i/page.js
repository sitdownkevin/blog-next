import { JournalClause } from "@/components/JournalClause";
import { JournalTable } from "@/components/JournalTable";


const journalesTableI = [
    {
        "title": "Academy of Management Journal",
        "subject area": "",
        "print issn": "0001-4273",
        "online issn": ""
    },
    {
        "title": "Academy of Management Review",
        "subject area": "",
        "print issn": "0363-7425",
        "online issn": ""
    },
    {
        "title": "Administrative Science Quarterly",
        "subject area": "",
        "print issn": "0001-8392",
        "online issn": ""
    },
    {
        "title": "American Economic Review",
        "subject area": "",
        "print issn": "0002-8282",
        "online issn": ""
    },
    {
        "title": "Econometrica",
        "subject area": "",
        "print issn": "0012-9682",
        "online issn": ""
    },
    {
        "title": "Information Systems Research",
        "subject area": "",
        "print issn": "1047-7047",
        "online issn": ""
    },
    {
        "title": "Journal of Accounting and Economics",
        "subject area": "",
        "print issn": "0165-4101",
        "online issn": ""
    },
    {
        "title": "Journal of Accounting Research",
        "subject area": "",
        "print issn": "0021-8456",
        "online issn": ""
    },
    {
        "title": "Journal of Consumer Research",
        "subject area": "",
        "print issn": "0093-5301",
        "online issn": ""
    },
    {
        "title": "Journal of Finance",
        "subject area": "",
        "print issn": "0022-1082",
        "online issn": ""
    },
    {
        "title": "Journal of Financial Economics",
        "subject area": "",
        "print issn": "0304-405X",
        "online issn": ""
    },
    {
        "title": "Journal of International Business Studies",
        "subject area": "",
        "print issn": "0047-2506",
        "online issn": ""
    },
    {
        "title": "Journal of Marketing",
        "subject area": "",
        "print issn": "0022-2429",
        "online issn": ""
    },
    {
        "title": "Journal of Marketing Research",
        "subject area": "",
        "print issn": "0022-2437",
        "online issn": ""
    },
    {
        "title": "Journal of Operations Management",
        "subject area": "",
        "print issn": "0272-6963",
        "online issn": ""
    },
    {
        "title": "Journal of Political Economy",
        "subject area": "",
        "print issn": "0022-3808",
        "online issn": ""
    },
    {
        "title": "Management Information Systems (MIS Quarterly)",
        "subject area": "",
        "print issn": "0276-7783",
        "online issn": ""
    },
    {
        "title": "Management Science",
        "subject area": "",
        "print issn": "0025-1909",
        "online issn": ""
    },
    {
        "title": "Manufacturing & Service Operations Management (M&SOM)",
        "subject area": "",
        "print issn": "1523-4614",
        "online issn": ""
    },
    {
        "title": "Marketing Science",
        "subject area": "",
        "print issn": "0732-2399",
        "online issn": ""
    },
    {
        "title": "Operations Research",
        "subject area": "",
        "print issn": "0030-364X",
        "online issn": ""
    },
    {
        "title": "Organization Science",
        "subject area": "",
        "print issn": "1047-7039",
        "online issn": ""
    },
    {
        "title": "Production and Operations Management Society (POMS)",
        "subject area": "",
        "print issn": "1059-1478",
        "online issn": ""
    },
    {
        "title": "Quarterly Journal of Economics",
        "subject area": "",
        "print issn": "0033-5533",
        "online issn": ""
    },
    {
        "title": "Review of Economic Studies",
        "subject area": "",
        "print issn": "0034-6527",
        "online issn": ""
    },
    {
        "title": "Review of Financial Studies",
        "subject area": "",
        "print issn": "0893-9454",
        "online issn": ""
    },
    {
        "title": "Strategic Management Journal",
        "subject area": "",
        "print issn": "0143-2095",
        "online issn": ""
    },
    {
        "title": "The Accounting Review",
        "subject area": "",
        "print issn": "0001-4826",
        "online issn": ""
    },
    {
        "title": "Accounting, Organizations and Society",
        "subject area": "",
        "print issn": "0361-3682",
        "online issn": ""
    },
    {
        "title": "American Economic Journal: Applied Economics",
        "subject area": "",
        "print issn": "1945-7782",
        "online issn": ""
    },
    {
        "title": "American Economic Journal: Macroeconomics",
        "subject area": "",
        "print issn": "1945-7707",
        "online issn": ""
    },
    {
        "title": "American Economic Journal: Microeconomics",
        "subject area": "",
        "print issn": "1945-7669",
        "online issn": ""
    },
    {
        "title": "American Journal of Agriculture Economics",
        "subject area": "",
        "print issn": "0002-9092",
        "online issn": ""
    },
    {
        "title": "Contemporary Accounting Research",
        "subject area": "",
        "print issn": "0823-9150",
        "online issn": ""
    },
    {
        "title": "Entrepreneurship Theory and Practice",
        "subject area": "",
        "print issn": "1042-2587",
        "online issn": ""
    },
    {
        "title": "Global Environmental Change-Human and Policy Dimensions",
        "subject area": "",
        "print issn": "0959-3780",
        "online issn": ""
    },
    {
        "title": "Human Resource Management",
        "subject area": "",
        "print issn": "0090-4848",
        "online issn": ""
    },
    {
        "title": "IEEE Transactions on Automatic Control",
        "subject area": "",
        "print issn": "0018-9286",
        "online issn": ""
    },
    {
        "title": "International Economic Review",
        "subject area": "",
        "print issn": "0020-6598",
        "online issn": ""
    },
    {
        "title": "Journal of Applied Psychology",
        "subject area": "",
        "print issn": "0021-9010",
        "online issn": ""
    },
    {
        "title": "Journal of Business Venturing",
        "subject area": "",
        "print issn": "0883-9026",
        "online issn": ""
    },
    {
        "title": "Journal of Consumer Psychology",
        "subject area": "",
        "print issn": "1057-7408",
        "online issn": ""
    },
    {
        "title": "Journal of Development Economics",
        "subject area": "",
        "print issn": "0304-3878",
        "online issn": ""
    },
    {
        "title": "Journal of Economic Literature",
        "subject area": "",
        "print issn": "0022-0515",
        "online issn": ""
    },
    {
        "title": "Journal of Economic Theory",
        "subject area": "",
        "print issn": "0022-0531",
        "online issn": ""
    },
    {
        "title": "Journal of Financial and Quantitative Analysis",
        "subject area": "",
        "print issn": "0022-1090",
        "online issn": ""
    },
    {
        "title": "Journal of International Economics",
        "subject area": "",
        "print issn": "0022-1996",
        "online issn": ""
    },
    {
        "title": "Journal of Labor Economics",
        "subject area": "",
        "print issn": "0734-306X",
        "online issn": ""
    },
    {
        "title": "Journal of Management",
        "subject area": "",
        "print issn": "0149-2063",
        "online issn": ""
    },
    {
        "title": "Journal of Management Information Systems",
        "subject area": "",
        "print issn": "0742-1222",
        "online issn": ""
    },
    {
        "title": "Journal of Management Studies",
        "subject area": "",
        "print issn": "0022-2380",
        "online issn": ""
    },
    {
        "title": "Journal of Monetary Economics",
        "subject area": "",
        "print issn": "0304-3932",
        "online issn": ""
    },
    {
        "title": "Journal of Public Administration: Research and Theory",
        "subject area": "",
        "print issn": "1053-1858",
        "online issn": ""
    },
    {
        "title": "Journal of Public Economics",
        "subject area": "",
        "print issn": "0047-2727",
        "online issn": ""
    },
    {
        "title": "Journal of the Academy of Marketing Science",
        "subject area": "",
        "print issn": "0092-0703",
        "online issn": ""
    },
    {
        "title": "Journal of Urban Economics",
        "subject area": "",
        "print issn": "0094-1190",
        "online issn": ""
    },
    {
        "title": "Journal on Computing",
        "subject area": "",
        "print issn": "1091-9856",
        "online issn": ""
    },
    {
        "title": "Mathematical Programming",
        "subject area": "",
        "print issn": "0025-5610",
        "online issn": ""
    },
    {
        "title": "Organization Studies",
        "subject area": "",
        "print issn": "0170-8406",
        "online issn": ""
    },
    {
        "title": "Organizational Behaviour and Human Decision Processes",
        "subject area": "",
        "print issn": "0749-5978",
        "online issn": ""
    },
    {
        "title": "Personnel Psychology",
        "subject area": "",
        "print issn": "0031-5826",
        "online issn": ""
    },
    {
        "title": "Policy Studies Journal",
        "subject area": "",
        "print issn": "0190-292X",
        "online issn": ""
    },
    {
        "title": "Public Administration Review",
        "subject area": "",
        "print issn": "0033-3352",
        "online issn": ""
    },
    {
        "title": "Public Administration: An International Quarterly",
        "subject area": "",
        "print issn": "0033-3298",
        "online issn": ""
    },
    {
        "title": "Rand Journal of Economics",
        "subject area": "",
        "print issn": "0741-6261",
        "online issn": ""
    },
    {
        "title": "Regional Studies",
        "subject area": "",
        "print issn": "0034-3404",
        "online issn": ""
    },
    {
        "title": "Research Policy",
        "subject area": "",
        "print issn": "0048-7333",
        "online issn": ""
    },
    {
        "title": "Review of Accounting Studies",
        "subject area": "",
        "print issn": "1380-6653",
        "online issn": ""
    },
    {
        "title": "Review of Finance",
        "subject area": "",
        "print issn": "1572-3097",
        "online issn": ""
    },
    {
        "title": "Strategic Entrepreneurship Journal",
        "subject area": "",
        "print issn": "1932-4391",
        "online issn": ""
    },
    {
        "title": "The Journal of Law and Economics",
        "subject area": "",
        "print issn": "0022-2186",
        "online issn": ""
    },
    {
        "title": "The Review of Economics and Statistics",
        "subject area": "",
        "print issn": "0034-6535",
        "online issn": ""
    },
    {
        "title": "Transportation Research Part B: Methodological",
        "subject area": "",
        "print issn": "0191-2615",
        "online issn": ""
    },
    {
        "title": "Transportation Science",
        "subject area": "",
        "print issn": "0041-1655",
        "online issn": ""
    },
    {
        "title": "World Development",
        "subject area": "",
        "print issn": "0305-750X",
        "online issn": ""
    },
    {
        "title": "Nature",
        "subject area": "",
        "print issn": "1476-4687",
        "online issn": ""
    },
    {
        "title": "Nature Energy",
        "subject area": "",
        "print issn": "2058-7546",
        "online issn": ""
    },
    {
        "title": "Nature Communications",
        "subject area": "",
        "print issn": "2041-1723",
        "online issn": ""
    },
    {
        "title": "Nature Human Behaviour",
        "subject area": "",
        "print issn": "2397-3374",
        "online issn": ""
    },
    {
        "title": "Nature Sustainability",
        "subject area": "",
        "print issn": "2398-9629",
        "online issn": ""
    },
    {
        "title": "Science",
        "subject area": "",
        "print issn": "0036-8075",
        "online issn": ""
    },
    {
        "title": "Science Robotics",
        "subject area": "",
        "print issn": "2470-9476",
        "online issn": ""
    },
    {
        "title": "Proceedings of the National Academy of Sciences of the USA",
        "subject area": "",
        "print issn": "0027-8424",
        "online issn": ""
    }
];


export default function Page() {
    return (
        <div className="flex flex-col items-center">
            <JournalClause journals={journalesTableI} caption={"Scopus - TJSEM Table I"} />
            <JournalTable journals={journalesTableI} tableCaption={"TJSEM Table I"}/>
        </div>
    )
}