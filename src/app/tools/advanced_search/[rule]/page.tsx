import { getData, getDescription } from "@/lib/advanced-search";
import JournalTable from "@/components/features/tools/advanced-search/JournalTable";
import JournalClause from "@/components/features/tools/advanced-search/JournalClause";
import DescriptionCard from "@/components/features/tools/advanced-search/DescriptionCard";
import { JournalType } from "@/lib/types";

const caption = {
  utd: "UTD24",
  ft: "FT50",
  ais: "AIS Basket",
  tjsem_i: "TJSEM I",
  tjsem_ii: "TJSEM II",
  ustc_som: "USTC SOM",
  ustc_som_2a1: "2A1",
  ustc_som_a1: "A1",
  ustc_som_a2: "A2",
  ustc_som_a3: "A3",
  ustc_som_b1: "B1",
  ustc_som_b2: "B2",
  ustc_som_c1: "C1",
};

export const dynamicParams = false;
export async function generateStaticParams() {
  return Object.keys(caption).map((rule) => {
    return { rule };
  });
}

export async function generateMetadata({ params }) {
  const { rule } = await params;

  return {
    title: `${caption[rule]} - Advanced Search`,
    description: `Advanced search for ${caption[rule]}`,
  };
}

export default async function Page({ params }) {
  const { rule } = await params;
  let data: JournalType[] = [];
  let title = "";
  let link = "";

  let subjectAreaTitle = "Subject Area";

  if (rule.startsWith("ustc_som")) {
    data = await getData('ustc_som');
    data = data.filter((journal) => journal.subjectArea === caption[rule]);
    // console.log(data);
    ({ title, link } = await getDescription('ustc_som'));
    subjectAreaTitle = "Level";
  } else {
    data = await getData(rule);
    ({ title, link } = await getDescription(rule));
  }

  let hideSubjectArea = false;
  if (rule.startsWith("tjsem") || rule === "ais") {
    hideSubjectArea = true;
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <JournalClause journals={data} />
      <JournalTable journals={data} tableCaption={caption[rule]} hideSubjectArea={hideSubjectArea} subjectAreaTitle={subjectAreaTitle} />
      <DescriptionCard title={title} link={link} />
    </div>
  );
}
