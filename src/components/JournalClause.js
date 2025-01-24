"use client"

import { ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast";

export function JournalClause({ journals, caption }) {
    const { toast } = useToast();
    const [open, setOpen] = useState(true);

    const handleCopyCode = (code) => {
        navigator.clipboard.writeText(code);

        toast({
            title: "Copied",
        })
    }

    function constructISSNQuery(journals) {
        const issnClauses = journals
            .filter(journal => journal["print issn"]) // 过滤空ISSN
            .map(journal => `ISSN(${journal["print issn"]})`) // 构造ISSN查询条件
            .join(' OR '); // 用OR连接所有条件

        return issnClauses;
    }


    const code = constructISSNQuery(journals);

    return (
        <Card className="w-full mb-8">
            <CardContent className="p-6">
                <Collapsible open={open} onOpenChange={setOpen}>
                    <div className="flex flex-row justify-between items-center">
                        <span className="text-sm font-medium">{caption}</span>
                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                onClick={() => handleCopyCode(code)}
                            >
                                Copy
                            </Button>
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="sm">
                                    {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                    <span className="sr-only">Toggle</span>
                                </Button>
                            </CollapsibleTrigger>
                        </div>
                    </div>
                    <CollapsibleContent className="mt-4">
                        <pre className="bg-gray-100 p-4 rounded-md text-sm whitespace-pre-wrap">
                            <code>{code}</code>
                        </pre>
                    </CollapsibleContent>
                </Collapsible>
            </CardContent>
        </Card>
    )

}