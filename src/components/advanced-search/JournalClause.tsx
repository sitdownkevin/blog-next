"use client";

import { JournalType } from "@/lib/types";
import React from "react";

function constructISSNQueryForScopus(journals: JournalType[]): string {
  const issnClauses = journals
    .filter((journal: JournalType) => journal.printIssn) // 过滤空ISSN
    .map((journal: JournalType) => `ISSN(${journal.printIssn})`) // 构造ISSN查询条件
    .join(" OR "); // 用OR连接所有条件

  return issnClauses;
}


function constructISSNQueryForWos(journals: JournalType[]): string {
  let issnClauses = "IS=(";
  for (const journal of journals) {
    if (journal.printIssn) {
      issnClauses += `${journal.printIssn} OR `;
    }
  }
  issnClauses = issnClauses.slice(0, -4) + ")";
  console.log(issnClauses);
  return issnClauses;
}

function CodeBlock({ code, title }: { code: string; title: string }) {
  const [copied, setCopied] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-lg border backdrop-blur-sm bg-muted/30 p-4">
      <div className="text-sm font-medium text-muted-foreground">
        {title}
      </div>
      <div className="absolute right-2 top-2 flex gap-1">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-md p-2 hover:bg-accent/50 hover:text-accent-foreground transition-colors backdrop-blur-sm"
          title={collapsed ? "展开" : "折叠"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transform transition-transform duration-200 ${
              collapsed ? "rotate-180" : ""
            }`}
          >
            <path d="m18 15-6-6-6 6"/>
          </svg>
        </button>

        <button
          onClick={handleCopy}
          className="rounded-md p-2 hover:bg-accent/50 hover:text-accent-foreground transition-colors backdrop-blur-sm"
          title={copied ? "已复制！" : "复制到剪贴板"}
        >
          {copied ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-500"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-75 hover:opacity-100"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          )}
        </button>
      </div>
      <div
        className={`rounded backdrop-blur-md bg-background/50 overflow-hidden transition-all duration-200 ${
          collapsed ? "h-0 p-0" : "mt-4"
        } text-xs font-maple`}
      >
        {code}
      </div>
    </div>
  );
}


export default function JournalClause({
  journals,
}: {
  journals: JournalType[];
}) {
  const codeForScopus = constructISSNQueryForScopus(journals);
  const codeForWos = constructISSNQueryForWos(journals);

  return (
    <div className="w-full space-y-4">
      <CodeBlock code={codeForScopus} title="Scopus" />
      <CodeBlock code={codeForWos} title="Web of Science" />
    </div>
  );
}
