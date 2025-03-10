import { getData, getDescription } from "@/lib/advanced-search";
import JournalTable from "@/components/advanced-search/JournalTable";
import JournalClause from "@/components/advanced-search/JournalClause";
import DescriptionCard from "@/components/advanced-search/DescriptionCard";
import { JournalType } from "@/lib/types";


const rules = ["utd"]; // ["utd", "ft", "tjsem_i", "tjsem_ii", "tjsem_iii"]
const caption = {
  utd: "UTD24",
  ft: "FT50",
  tjsem_i: "TJSEM I",
  tjsem_ii: "TJSEM II",
  tjsem_iii: "TJSEM III",
};

export const dynamicParams = false;
export async function generateStaticParams() {
  return rules.map((rule) => {
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
  const data: JournalType[] = await getData(rule);
  const { title, link } = await getDescription(rule);

  return (
    <div className="flex flex-col items-center space-y-4">
      <DescriptionCard title={title} link={link} />
      <JournalClause journals={data} />
      <JournalTable journals={data} tableCaption={caption[rule]} />
    </div>
  );
}
