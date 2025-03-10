"use client";

import { JournalType } from "@/lib/types";
import CodeLayout from "react-code-preview-layout";

function constructISSNQueryForScopus(journals: JournalType[]): string {
  const issnClauses = journals
    .filter((journal: JournalType) => journal.printIssn) // 过滤空ISSN
    .map((journal: JournalType) => `ISSN(${journal.printIssn})`) // 构造ISSN查询条件
    .join(" OR "); // 用OR连接所有条件

  return issnClauses;
}

export default function JournalClause({
  journals,
}: {
  journals: JournalType[];
}) {
  const code = constructISSNQueryForScopus(journals);

  return (
    <CodeLayout className="w-full" bordered={true}>
      {/* <CodeLayout.Preview>
        {code}
      </CodeLayout.Preview> */}
      <CodeLayout.Toolbar text={code} visibleButton={true} collapse={false}>
        Scopus
      </CodeLayout.Toolbar>
      <CodeLayout.Code tagName="pre" className="whitespace-pre-wrap">
        {code}
      </CodeLayout.Code>
    </CodeLayout>
  );
}
