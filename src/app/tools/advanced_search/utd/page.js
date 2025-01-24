"use client";


import React, { use } from "react"
import { useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast";
// import { ToastAction } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";


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



function constructISSNQuery(journals) {
    const issnClauses = journals
        .filter(journal => journal["print issn"]) // 过滤空ISSN
        .map(journal => `ISSN(${journal["print issn"]})`) // 构造ISSN查询条件
        .join(' OR '); // 用OR连接所有条件

    return issnClauses;
}


export default function Page() {
    const { toast } = useToast();
    const [scopusOpen, setScopusOpen] = useState(true)

    const handleCopyCode = (code) => {
        navigator.clipboard.writeText(code);
        toast({
            title: "Copied",
        })
    }

    const exampleCode = constructISSNQuery(journalsUTD);


    return (
        <div className="flex flex-col items-center">
            <Card className="w-full mb-8">
                <CardContent className="p-6">
                    <Collapsible open={scopusOpen} onOpenChange={setScopusOpen}>
                        <div className="flex flex-row justify-between items-center">
                            <span className="text-sm font-medium">Scopus</span>
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    onClick={() => handleCopyCode(exampleCode)}
                                >
                                    Copy
                                </Button>
                                <CollapsibleTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        {scopusOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                        <span className="sr-only">Toggle</span>
                                    </Button>
                                </CollapsibleTrigger>
                            </div>
                        </div>
                        <CollapsibleContent className="mt-4">
                            <pre className="bg-gray-100 p-4 rounded-md text-sm whitespace-pre-wrap">
                                <code>{exampleCode}</code>
                            </pre>
                        </CollapsibleContent>
                    </Collapsible>
                </CardContent>
            </Card>


            <Table className="w-full mb-8">
                <TableCaption>UTD</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Index</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Subject Area</TableHead>
                        <TableHead>Print ISSN</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {journalsUTD.map((journal, index) => {
                        return (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{journal.title}</TableCell>
                                <TableCell>{journal["subject area"]}</TableCell>
                                <TableCell>{journal["print issn"]}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>

            <Toaster />
        </div>
    )
}