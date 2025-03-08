"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function JournalClause({
  journals,
  caption,
}: {
  journals: any[];
  caption: string;
}) {
  const { toast } = useToast();
  const [open, setOpen] = useState(true);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);

    toast({
      title: "Copied",
    });
  };

  function constructISSNQuery(journals: any[]) {
    const issnClauses = journals
      .filter((journal: any) => journal.printIssn) // 过滤空ISSN
      .map((journal: any) => `ISSN(${journal.printIssn})`) // 构造ISSN查询条件
      .join(" OR "); // 用OR连接所有条件

    return issnClauses;
  }

  const code = constructISSNQuery(journals);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="w-full">
      <div className="flex gap-2">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            {open ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
        <Button
          size="sm"
          onClick={() => handleCopyCode(code)}
          variant="outline"
        >
          Copy
        </Button>
      </div>
      <CollapsibleContent className="mt-4">
        <pre className="bg-gray-100 p-4 rounded-md text-sm whitespace-pre-wrap">
          <code>{code}</code>
        </pre>
      </CollapsibleContent>
    </Collapsible>
  );
}
