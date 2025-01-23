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


const journalesTableI = [
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
        "publisher": "Johnson at Cornell University"
    },
    {
        "title": "American Economic Review",
        "subject area": "Economics",
        "publisher": "American Economic Association"
    },
    {
        "title": "Econometrica",
        "subject area": "Economics",
        "publisher": "Econometric Society"
    },
    {
        "title": "Information Systems Research",
        "subject area": "Information Systems",
        "publisher": "INFORMS"
    },
    {
        "title": "Journal of Accounting and Economics",
        "subject area": "Accounting",
        "publisher": "Elsevier"
    },
    {
        "title": "Journal of Accounting Research",
        "subject area": "Accounting",
        "publisher": "University of Chicago Press"
    },
    {
        "title": "Journal of Consumer Research",
        "subject area": "Marketing",
        "publisher": "University of Chicago Press"
    },
    {
        "title": "Journal of Finance",
        "subject area": "Finance",
        "publisher": "American Finance Association"
    },
    {
        "title": "Journal of Financial Economics",
        "subject area": "Finance",
        "publisher": "Elsevier"
    },
    {
        "title": "Journal of International Business Studies",
        "subject area": "International Business",
        "publisher": "Palgrave Macmillan"
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
        "title": "Journal of Operations Management",
        "subject area": "Operations Management",
        "publisher": "Elsevier"
    },
    {
        "title": "Journal of Political Economy",
        "subject area": "Economics",
        "publisher": "University of Chicago Press"
    },
    {
        "title": "Management Information Systems (MIS Quarterly)",
        "subject area": "Information Systems",
        "publisher": "Management Information Systems Research Center"
    },
    {
        "title": "Management Science",
        "subject area": "Management",
        "publisher": "INFORMS"
    },
    {
        "title": "Manufacturing & Service Operations Management (M&SOM)",
        "subject area": "Operations Management",
        "publisher": "INFORMS"
    },
    {
        "title": "Marketing Science",
        "subject area": "Marketing",
        "publisher": "INFORMS"
    },
    {
        "title": "Operations Research",
        "subject area": "Operations Research",
        "publisher": "INFORMS"
    },
    {
        "title": "Organization Science",
        "subject area": "Management",
        "publisher": "INFORMS"
    },
    {
        "title": "Production and Operations Management Society (POMS)",
        "subject area": "Operations Management",
        "publisher": "POMS"
    },
    {
        "title": "Quarterly Journal of Economics",
        "subject area": "Economics",
        "publisher": "Oxford University Press"
    },
    {
        "title": "Review of Economic Studies",
        "subject area": "Economics",
        "publisher": "Oxford University Press"
    },
    {
        "title": "Review of Financial Studies",
        "subject area": "Finance",
        "publisher": "Oxford University Press"
    },
    {
        "title": "Strategic Management Journal",
        "subject area": "Management",
        "publisher": "Wiley"
    },
    {
        "title": "The Accounting Review",
        "subject area": "Accounting",
        "publisher": "American Accounting Association"
    },
    {
        "title": "Accounting, Organizations and Society",
        "subject area": "Accounting",
        "publisher": "Elsevier"
    },
    {
        "title": "American Economic Journal: Applied Economics",
        "subject area": "Economics",
        "publisher": "American Economic Association"
    },
    {
        "title": "American Economic Journal: Macroeconomics",
        "subject area": "Economics",
        "publisher": "American Economic Association"
    },
    {
        "title": "American Economic Journal: Microeconomics",
        "subject area": "Economics",
        "publisher": "American Economic Association"
    },
    {
        "title": "American Journal of Agricultural Economics",
        "subject area": "Agricultural Economics",
        "publisher": "Oxford University Press"
    },
    {
        "title": "Contemporary Accounting Research",
        "subject area": "Accounting",
        "publisher": "Wiley"
    },
    {
        "title": "Entrepreneurship Theory and Practice",
        "subject area": "Entrepreneurship",
        "publisher": "Sage Publications"
    },
    {
        "title": "Global Environmental Change-Human and Policy Dimensions",
        "subject area": "Environmental Studies",
        "publisher": "Elsevier"
    },
    {
        "title": "Human Resource Management",
        "subject area": "Human Resources",
        "publisher": "Wiley"
    },
    {
        "title": "IEEE Transactions on Automatic Control",
        "subject area": "Engineering",
        "publisher": "IEEE"
    },
    {
        "title": "International Economic Review",
        "subject area": "Economics",
        "publisher": "Wiley"
    },
    {
        "title": "Journal of Applied Psychology",
        "subject area": "Psychology",
        "publisher": "American Psychological Association"
    },
    {
        "title": "Journal of Business Venturing",
        "subject area": "Entrepreneurship",
        "publisher": "Elsevier"
    },
    {
        "title": "Journal of Consumer Psychology",
        "subject area": "Marketing",
        "publisher": "Elsevier"
    },
    {
        "title": "Journal of Development Economics",
        "subject area": "Economics",
        "publisher": "Elsevier"
    },
    {
        "title": "Journal of Economic Literature",
        "subject area": "Economics",
        "publisher": "American Economic Association"
    },
    {
        "title": "Journal of Economic Theory",
        "subject area": "Economics",
        "publisher": "Elsevier"
    },
    {
        "title": "Journal of Financial and Quantitative Analysis",
        "subject area": "Finance",
        "publisher": "Cambridge University Press"
    },
    {
        "title": "Journal of International Economics",
        "subject area": "Economics",
        "publisher": "Elsevier"
    },
    {
        "title": "Journal of Labor Economics",
        "subject area": "Economics",
        "publisher": "University of Chicago Press"
    },
    {
        "title": "Journal of Management",
        "subject area": "Management",
        "publisher": "Sage Publications"
    },
    {
        "title": "Journal of Management Information Systems",
        "subject area": "Information Systems",
        "publisher": "M.E. Sharpe"
    },
    {
        "title": "Journal of Management Studies",
        "subject area": "Management",
        "publisher": "Wiley"
    },
    {
        "title": "Journal of Monetary Economics",
        "subject area": "Economics",
        "publisher": "Elsevier"
    },
    {
        "title": "Journal of Public Administration: Research and Theory",
        "subject area": "Public Administration",
        "publisher": "Oxford University Press"
    },
    {
        "title": "Journal of Public Economics",
        "subject area": "Economics",
        "publisher": "Elsevier"
    },
    {
        "title": "Journal of the Academy of Marketing Science",
        "subject area": "Marketing",
        "publisher": "Springer"
    },
    {
        "title": "Journal of Urban Economics",
        "subject area": "Economics",
        "publisher": "Elsevier"
    },
    {
        "title": "Journal on Computing",
        "subject area": "Computer Science",
        "publisher": "INFORMS"
    },
    {
        "title": "Mathematical Programming",
        "subject area": "Mathematics",
        "publisher": "Springer"
    },
    {
        "title": "Organization Studies",
        "subject area": "Management",
        "publisher": "Sage Publications"
    },
    {
        "title": "Organizational Behaviour and Human Decision Processes",
        "subject area": "Psychology",
        "publisher": "Elsevier"
    },
    {
        "title": "Personnel Psychology",
        "subject area": "Psychology",
        "publisher": "Wiley"
    },
    {
        "title": "Policy Studies Journal",
        "subject area": "Public Policy",
        "publisher": "Wiley"
    },
    {
        "title": "Public Administration Review",
        "subject area": "Public Administration",
        "publisher": "Wiley"
    },
    {
        "title": "Public Administration: An International Quarterly",
        "subject area": "Public Administration",
        "publisher": "Wiley"
    },
    {
        "title": "Rand Journal of Economics",
        "subject area": "Economics",
        "publisher": "Wiley"
    },
    {
        "title": "Regional Studies",
        "subject area": "Geography",
        "publisher": "Routledge"
    },
    {
        "title": "Research Policy",
        "subject area": "Management",
        "publisher": "Elsevier"
    },
    {
        "title": "Review of Accounting Studies",
        "subject area": "Accounting",
        "publisher": "Springer"
    },
    {
        "title": "Review of Finance",
        "subject area": "Finance",
        "publisher": "Oxford University Press"
    },
    {
        "title": "Strategic Entrepreneurship Journal",
        "subject area": "Entrepreneurship",
        "publisher": "Wiley"
    },
    {
        "title": "The Journal of Law and Economics",
        "subject area": "Law and Economics",
        "publisher": "University of Chicago Press"
    },
    {
        "title": "The Review of Economics and Statistics",
        "subject area": "Economics",
        "publisher": "MIT Press"
    },
    {
        "title": "Transportation Research Part B: Methodological",
        "subject area": "Transportation",
        "publisher": "Elsevier"
    },
    {
        "title": "Transportation Science",
        "subject area": "Transportation",
        "publisher": "INFORMS"
    },
    {
        "title": "World Development",
        "subject area": "Economics",
        "publisher": "Elsevier"
    },
    {
        "title": "Nature",
        "subject area": "Multidisciplinary",
        "publisher": "Nature Publishing Group"
    },
    {
        "title": "Nature Energy",
        "subject area": "Energy",
        "publisher": "Nature Publishing Group"
    },
    {
        "title": "Nature Communications",
        "subject area": "Multidisciplinary",
        "publisher": "Nature Publishing Group"
    },
    {
        "title": "Nature Human Behaviour",
        "subject area": "Behavioral Sciences",
        "publisher": "Nature Publishing Group"
    },
    {
        "title": "Nature Sustainability",
        "subject area": "Sustainability",
        "publisher": "Nature Publishing Group"
    },
    {
        "title": "Science",
        "subject area": "Multidisciplinary",
        "publisher": "American Association for the Advancement of Science"
    },
    {
        "title": "Science Robotics",
        "subject area": "Robotics",
        "publisher": "American Association for the Advancement of Science"
    },
    {
        "title": "Proceedings of the National Academy of Sciences of the USA",
        "subject area": "Multidisciplinary",
        "publisher": "National Academy of Sciences"
    }
];


const journalsUTD = journalesTableI;



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
                            <span className="text-sm font-medium">Scopus - TJSEM Table I</span>
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
                <TableCaption>TJSEM - Table I</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Index</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Subject Area</TableHead>
                        <TableHead>Publisher</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {journalesTableI.map((journal, index) => {
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