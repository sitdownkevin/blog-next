import { JournalClause } from "@/components/JournalClause";
import { JournalTable } from "@/components/JournalTable";


const journalesTableIII = [
    {
        "title": "International Journal of Managing Projects in Business",
        "subject area": "",
        "print issn": "1753-8378",
        "online issn": ""
    },
    {
        "title": "Engineering Application of Artificial Intelligence",
        "subject area": "",
        "print issn": "0952-1976",
        "online issn": ""
    },
    {
        "title": "中国软科学",
        "subject area": "",
        "print issn": "1005-0566",
        "online issn": ""
    },
    {
        "title": "会计研究",
        "subject area": "",
        "print issn": "1003-2886",
        "online issn": ""
    },
    {
        "title": "管理评论",
        "subject area": "",
        "print issn": "1003-1952",
        "online issn": ""
    },
    {
        "title": "南开管理评论",
        "subject area": "",
        "print issn": "1008-3448",
        "online issn": ""
    },
    {
        "title": "科研管理",
        "subject area": "",
        "print issn": "1000-2995",
        "online issn": ""
    },
    {
        "title": "情报学报",
        "subject area": "",
        "print issn": "1007-7634",
        "online issn": ""
    },
    {
        "title": "公共管理学报",
        "subject area": "",
        "print issn": "1672-6162",
        "online issn": ""
    },
    {
        "title": "科学学研究",
        "subject area": "",
        "print issn": "1003-2053",
        "online issn": ""
    },
    {
        "title": "中国工业经济",
        "subject area": "",
        "print issn": "1006-480X",
        "online issn": ""
    },
    {
        "title": "农业经济问题",
        "subject area": "",
        "print issn": "1000-6389",
        "online issn": ""
    },
    {
        "title": "管理学报",
        "subject area": "",
        "print issn": "1672-884X",
        "online issn": ""
    },
    {
        "title": "工业工程与管理",
        "subject area": "",
        "print issn": "1007-5429",
        "online issn": ""
    },
    {
        "title": "系统工程",
        "subject area": "",
        "print issn": "1001-4098",
        "online issn": ""
    },
    {
        "title": "科学学与科学技术管理",
        "subject area": "",
        "print issn": "1002-0241",
        "online issn": ""
    },
    {
        "title": "研究与发展管理",
        "subject area": "",
        "print issn": "1004-8308",
        "online issn": ""
    },
    {
        "title": "中国人口资源与环境",
        "subject area": "",
        "print issn": "1002-2104",
        "online issn": ""
    },
    {
        "title": "数理统计与管理",
        "subject area": "",
        "print issn": "1002-1566",
        "online issn": ""
    },
    {
        "title": "中国农村经济",
        "subject area": "",
        "print issn": "1002-8870",
        "online issn": ""
    },
    {
        "title": "经济学动态",
        "subject area": "",
        "print issn": "1002-8390",
        "online issn": ""
    },
    {
        "title": "经济学（季刊）",
        "subject area": "",
        "print issn": "2095-1086",
        "online issn": ""
    },
    {
        "title": "世界经济",
        "subject area": "",
        "print issn": "1002-9621",
        "online issn": ""
    },
    {
        "title": "系统工程与电子技术（中文版）",
        "subject area": "",
        "print issn": "1001-506X",
        "online issn": ""
    },
    {
        "title": "科技导报",
        "subject area": "",
        "print issn": "1000-7857",
        "online issn": ""
    },
    {
        "title": "同济大学学报自然科学版（限计入 1 篇）",
        "subject area": "",
        "print issn": "0253-374X",
        "online issn": ""
    }
];


export default function Page() {
    return (
        <div className="flex flex-col items-center">
            <JournalClause journals={journalesTableIII} caption={"Scopus - TJSEM Table III"} />
            <JournalTable journals={journalesTableIII} tableCaption={"TJSEM Table III"} hideSubjectArea={true} />
        </div>
    )
}