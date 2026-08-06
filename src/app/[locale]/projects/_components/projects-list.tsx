import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/lib/projects/data";

type ProjectsListProps = {
  projects: Project[];
};

export function ProjectsList({ projects }: ProjectsListProps) {
  const t = useTranslations("Projects");

  return (
    <div className="w-full flex flex-col py-8 px-4">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-balance">
          {t("title")}
        </h1>
        <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
      </div>

      <ul className="flex flex-col divide-y divide-border">
        {projects.map((project) => (
          <li key={project.slug} className="py-6 first:pt-0">
            <div className="flex flex-col gap-2">
              <h2 className="text-base sm:text-lg font-semibold text-balance">
                {project.title}
              </h2>
              <p className="text-sm text-foreground/75 leading-relaxed max-w-[52ch]">
                {project.summary}
              </p>
              <Link
                href={`/projects/${project.slug}`}
                className="text-sm font-medium text-claude-orange hover:underline w-fit"
              >
                {t("view")}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
