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
        "publisher": "American Accounting Association"
    },
    {
        "title": "Accounting, Organizations and Society",
        "subject area": "Accounting",
        "publisher": "Elsevier"
    },
    {
        "title": "Contemporary Accounting Research",
        "subject area": "Accounting",
        "publisher": "Wiley / Canadian Academic Accounting Association"
    },
    {
        "title": "Journal of Accounting and Economics",
        "subject area": "Accounting",
        "publisher": "Elsevier"
    },
    {
        "title": "Journal of Accounting Research",
        "subject area": "Accounting",
        "publisher": "Wiley / University of Chicago"
    },
    {
        "title": "Review of Accounting Studies",
        "subject area": "Accounting",
        "publisher": "Springer"
    },
    {
        "title": "American Economic Review",
        "subject area": "Economics",
        "publisher": "American Economic Association"
    },
    {
        "title": "Econometrica",
        "subject area": "Economics",
        "publisher": "Wiley / Econometric Society"
    },
    {
        "title": "Journal of Political Economy",
        "subject area": "Economics",
        "publisher": "University of Chicago Press"
    },
    {
        "title": "Quarterly Journal of Economics",
        "subject area": "Economics",
        "publisher": "Oxford University Press / Harvard University"
    },
    {
        "title": "Research Policy",
        "subject area": "Economics, Management",
        "publisher": "Elsevier"
    },
    {
        "title": "Review of Economic Studies",
        "subject area": "Economics",
        "publisher": "Oxford University Press"
    },
    {
        "title": "Entrepreneurship Theory and Practice",
        "subject area": "Entrepreneurship",
        "publisher": "Sage"
    },
    {
        "title": "Journal of Business Venturing",
        "subject area": "Entrepreneurship",
        "publisher": "Elsevier"
    },
    {
        "title": "Strategic Entrepreneurship Journal",
        "subject area": "Entrepreneurship",
        "publisher": "Wiley / Strategic Management Society"
    },
    {
        "title": "Journal of Business Ethics",
        "subject area": "Ethics",
        "publisher": "Springer"
    },
    {
        "title": "Journal of Finance",
        "subject area": "Finance",
        "publisher": "Wiley / American Finance Association"
    },
    {
        "title": "Journal of Financial and Quantitative Analysis",
        "subject area": "Finance",
        "publisher": "Cambridge University Press"
    },
    {
        "title": "Journal of Financial Economics",
        "subject area": "Finance",
        "publisher": "Elsevier"
    },
    {
        "title": "Review of Finance",
        "subject area": "Finance",
        "publisher": "Oxford University Press / European Finance Association"
    },
    {
        "title": "Review of Financial Studies",
        "subject area": "Finance",
        "publisher": "Oxford University Press"
    },
    {
        "title": "Human Relations",
        "subject area": "Human Resources",
        "publisher": "Sage"
    },
    {
        "title": "Human Resource Management",
        "subject area": "Human Resources",
        "publisher": "Wiley"
    },
    {
        "title": "Information Systems Research",
        "subject area": "Information Systems",
        "publisher": "INFORMS"
    },
    {
        "title": "Journal of Management Information Systems",
        "subject area": "Information Systems",
        "publisher": "Taylor & Francis"
    },
    {
        "title": "MIS Quarterly",
        "subject area": "Information Systems",
        "publisher": "Management Information Systems Research Centre, University of Minnesota"
    },
    {
        "title": "Journal of International Business Studies",
        "subject area": "International Business",
        "publisher": "Palgrave Macmillan / Academy of International Business"
    },
    {
        "title": "Academy of Management Journal",
        "subject area": "Management",
        "publisher": "Academy of Management"
    },
    {
        "title": "Academy of Management Review",
        "subject area": "Management",
        "publisher": "Academy of Management"
    },
    {
        "title": "Administrative Science Quarterly",
        "subject area": "Management",
        "publisher": "Sage / Cornell University"
    },
    {
        "title": "Harvard Business Review",
        "subject area": "Management",
        "publisher": "Harvard Business Publishing"
    },
    {
        "title": "Journal of Management",
        "subject area": "Management",
        "publisher": "Sage"
    },
    {
        "title": "Journal of Management Studies",
        "subject area": "Management",
        "publisher": "Wiley / Society for the Advancement of Management Studies"
    },
    {
        "title": "Management Science",
        "subject area": "Management",
        "publisher": "INFORMS"
    },
    {
        "title": "MIT Sloan Management Review",
        "subject area": "Management",
        "publisher": "MIT Press"
    },
    {
        "title": "Strategic Management Journal",
        "subject area": "Management",
        "publisher": "Wiley"
    },
    {
        "title": "Journal of Consumer Psychology",
        "subject area": "Marketing",
        "publisher": "Wiley / Society for Consumer Psychology"
    },
    {
        "title": "Journal of Consumer Research",
        "subject area": "Marketing",
        "publisher": "Oxford University Press"
    },
    {
        "title": "Journal of Marketing",
        "subject area": "Marketing",
        "publisher": "American Marketing Association"
    },
    {
        "title": "Journal of Marketing Research",
        "subject area": "Marketing",
        "publisher": "American Marketing Association"
    },
    {
        "title": "Journal of the Academy of Marketing Science",
        "subject area": "Marketing",
        "publisher": "Springer"
    },
    {
        "title": "Marketing Science",
        "subject area": "Marketing",
        "publisher": "INFORMS"
    },
    {
        "title": "Journal of Operations Management",
        "subject area": "Operations",
        "publisher": "Wiley / Association for Supply Chain Management"
    },
    {
        "title": "Manufacturing & Service Operations Management",
        "subject area": "Operations",
        "publisher": "INFORMS"
    },
    {
        "title": "Operations Research",
        "subject area": "Operations",
        "publisher": "INFORMS"
    },
    {
        "title": "Production and Operations Management",
        "subject area": "Operations",
        "publisher": "Sage / Production and Operations Management Society"
    },
    {
        "title": "Journal of Applied Psychology",
        "subject area": "Organizational Behaviour",
        "publisher": "American Psychological Association"
    },
    {
        "title": "Organization Science",
        "subject area": "Organizational Behaviour",
        "publisher": "INFORMS"
    },
    {
        "title": "Organization Studies",
        "subject area": "Organizational Behaviour",
        "publisher": "Sage"
    },
    {
        "title": "Organizational Behavior and Human Decision Processes",
        "subject area": "Organizational Behaviour",
        "publisher": "Elsevier"
    }
];




function processJournalsData(journals) {



    const processTitle = (title) => {
        return title
            .trim()
            .replace(/&/g, 'And')
            .split(/\s+/)
            .map(word =>
                /^[A-Z]+$/.test(word)  // 保留全大写单词（如 INFORMS）
                    ? word
                    : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(' ');
    }

    const journalClauses = journals.map(journal => {
        return `LIMIT-TO( EXACTSRCTITLE , "${processTitle(journal.title)}" )`
    }).join(' OR ');


    return journalClauses;
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

    const exampleCode = processJournalsData(journalsUTD);


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
                <TableCaption>FT50</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Index</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Subject Area</TableHead>
                        <TableHead>Publisher</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {journalsUTD.map((journal, index) => {
                        return (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{journal.title}</TableCell>
                                <TableCell>{journal["subject area"]}</TableCell>
                                <TableCell>{journal.publisher}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>

            <Toaster />
        </div>
    )
}