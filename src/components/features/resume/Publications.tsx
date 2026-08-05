import Link from "next/link";
import { PublicationElementType } from "@/lib/resume/types";
import { ResumeSection } from "./resume-section";

function PublicationText({ content }: { content: string }) {
  const match = content.match(/^(.*?)\s+(https?:\/\/\S+)\s*$/);

  if (!match) {
    return <span>{content}</span>;
  }

  return (
    <>
      <span>{match[1]}</span>{" "}
      <Link
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="text-claude-orange hover:underline whitespace-nowrap"
      >
        View
      </Link>
    </>
  );
}

interface PublicationsProps {
  publications: PublicationElementType[];
}

export default function Publications({ publications }: PublicationsProps) {
  return (
    <ResumeSection title="Publications">
      <ul className="flex flex-col">
        {publications.map((publication, index) => (
          <li
            key={index}
            className="py-3 border-b border-border last:border-b-0 last:pb-0 first:pt-0 text-sm text-foreground/80 leading-relaxed"
          >
            <PublicationText content={publication.content} />
          </li>
        ))}
      </ul>
    </ResumeSection>
  );
}
