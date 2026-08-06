import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/lib/projects/data";
import { cn } from "@/lib/utils";

type ProjectDetailProps = {
  project: Project;
};

const primaryButtonClass =
  "inline-flex items-center justify-center rounded-md bg-claude-orange px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-claude-orange/90 active:scale-[0.98]";

const secondaryButtonClass =
  "inline-flex items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:border-claude-orange hover:text-claude-orange dark:border-white/15 dark:hover:border-claude-orange active:scale-[0.98]";

function ActionLink({
  href,
  label,
  external,
  primary,
}: {
  href: string;
  label: string;
  external?: boolean;
  primary?: boolean;
}) {
  const className = cn(primary ? primaryButtonClass : secondaryButtonClass);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const t = useTranslations("Projects");

  return (
    <div className="w-full flex flex-col gap-10 py-8 px-4">
      <div className="flex flex-col gap-3">
        <Link
          href="/projects"
          className="text-xs font-medium text-muted-foreground hover:text-claude-orange transition-colors w-fit"
        >
          {t("backToList")}
        </Link>
        <h1 className="font-display text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
          {project.title}
        </h1>
        <p className="text-sm sm:text-base text-foreground/85 leading-relaxed max-w-[48ch]">
          {project.tagline}
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-[56ch]">
          {project.description}
        </p>
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-medium tracking-wide text-claude-orange">
          {t("features")}
        </h2>
        <ul className="flex flex-col divide-y divide-border">
          {project.features.map((feature) => (
            <li key={feature.title} className="py-4 first:pt-0 last:pb-0">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-sm font-semibold">{feature.title}</h3>
                <p className="text-sm text-foreground/75 leading-relaxed max-w-[52ch]">
                  {feature.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {project.sections.map((section) => (
        <section key={section.title} className="flex flex-col gap-4">
          <h2 className="text-xs font-medium tracking-wide text-claude-orange">
            {section.title}
          </h2>
          <div className="flex flex-wrap gap-3">
            {section.actions.map((action) => (
              <ActionLink
                key={`${section.title}-${action.label}`}
                href={action.href}
                label={action.label}
                external={action.external}
                primary={action.primary}
              />
            ))}
          </div>
        </section>
      ))}

      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-medium tracking-wide text-claude-orange">
          {t("links")}
        </h2>
        <ul className="flex flex-col gap-2">
          {project.links.map((link) => (
            <li key={link.label}>
              {link.external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-claude-orange hover:underline"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  href={link.href}
                  className="text-sm font-medium text-claude-orange hover:underline"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
