import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type {
  EducationItem,
  PersonalIntroDocument,
  ProjectItem,
  PublicationItem,
  WorkingExpItem,
} from "@/lib/personal-intro/types";

const sectionTitleClass =
  "font-display text-xl font-semibold tracking-tight text-balance";

export type LatestPost = {
  id: string;
  title: string;
  description?: string;
  create_date?: string;
  update_date?: string;
};

const EN_MONTH_ABBR: Record<string, string> = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sep",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};

/** Compact period for timeline rows so dates stay on one line. */
function formatPeriodCompact(
  period: { start: string; end: string },
  lang: "en" | "zh",
): string {
  if (lang === "zh") {
    return `${period.start.replace(/\s+/g, "")} - ${period.end.replace(/\s+/g, "")}`;
  }

  const shorten = (value: string) =>
    value.replace(
      /\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/g,
      (month) => EN_MONTH_ABBR[month] || month,
    );

  return `${shorten(period.start)} - ${shorten(period.end)}`;
}

function formatPostDate(value?: string, lang: "en" | "zh" = "en"): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString(lang === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function displayName(
  name: { first: string; last: string },
  lang: "en" | "zh",
): string {
  return lang === "zh" ? `${name.last}${name.first}` : `${name.first} ${name.last}`;
}

function Hero({
  lang,
  data,
}: {
  lang: "en" | "zh";
  data: PersonalIntroDocument;
}) {
  const t = useTranslations("Home");
  const abstract = data.abstract[lang] || data.abstract.en;
  const fullName = displayName(abstract.name, lang);
  const locationStr = `${abstract.location.city}, ${abstract.location.country}`;

  return (
    <section className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8 pb-12 border-b border-border">
      <div className="flex flex-col gap-5 min-w-0 flex-1">
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-balance">
            {fullName}
            <span
              className="inline-block w-2.5 h-2.5 ml-2 mb-1 rounded-sm bg-claude-orange align-baseline"
              aria-hidden
            />
          </h1>
          <p className="text-sm sm:text-base text-foreground/85 leading-relaxed max-w-[40ch]">
            {abstract.role}
          </p>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed max-w-[48ch]">
          {abstract.intro}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <a
            href={`mailto:${abstract.email}`}
            className="hover:text-claude-orange transition-colors"
          >
            {abstract.email}
          </a>
          <span aria-hidden className="text-border">
            /
          </span>
          <span>{locationStr}</span>
        </div>

        <div className="flex flex-wrap gap-3 pt-1">
          <Link
            href="/posts"
            className="inline-flex items-center justify-center rounded-md bg-claude-orange px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-claude-orange/90 active:scale-[0.98]"
          >
            {t("posts")}
          </Link>
          <Link
            href="/about/resume"
            className="inline-flex items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:border-claude-orange hover:text-claude-orange dark:border-white/15 dark:hover:border-claude-orange active:scale-[0.98]"
          >
            {t("resume")}
          </Link>
        </div>
      </div>

      <div className="hidden sm:block w-36 lg:w-40 shrink-0 self-start">
        <Image
          src="/assets/images/figures/figure.webp"
          alt={fullName}
          width={2125}
          height={3217}
          priority
          className="w-full aspect-[2/3] object-cover rounded-lg ring-1 ring-border dark:ring-white/10"
        />
      </div>
    </section>
  );
}

function FeaturedSection({
  lang,
  data,
}: {
  lang: "en" | "zh";
  data: PersonalIntroDocument;
}) {
  const t = useTranslations("Home");
  const pubs = (data.publications[lang] || data.publications.en)
    .items as PublicationItem[];
  const projects = (data.projects[lang] || data.projects.en)
    .items as ProjectItem[];

  const featuredPub =
    pubs.find((item) => item.featured) || pubs[0] || null;
  const featuredProjects = projects.filter((item) => item.featured).slice(0, 2);

  if (!featuredPub && featuredProjects.length === 0) return null;

  return (
    <section className="flex flex-col gap-6">
      <h2 className={sectionTitleClass}>{t("selected")}</h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-10">
        {featuredPub && (
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-xs font-medium tracking-wide text-claude-orange">
              {t("publication")}
            </span>
            <h3 className="text-base sm:text-lg font-semibold leading-snug text-balance">
              {featuredPub.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {featuredPub.journal}
              {featuredPub.year ? ` · ${featuredPub.year}` : ""}
            </p>
            {featuredPub.summary && (
              <p className="text-sm text-foreground/80 leading-relaxed max-w-[52ch]">
                {featuredPub.summary}
              </p>
            )}
            {featuredPub.url && (
              <a
                href={featuredPub.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-claude-orange hover:underline w-fit"
              >
                {t("read")}
              </a>
            )}
          </div>
        )}

        {featuredProjects.length > 0 && (
          <div className="md:col-span-2 flex flex-col gap-5">
            <span className="text-xs font-medium tracking-wide text-claude-orange">
              {t("projects")}
            </span>
            <ul className="flex flex-col divide-y divide-border">
              {featuredProjects.map((item) => (
                <li key={item.project} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex flex-col gap-1.5">
                    <span className="font-semibold text-sm">{item.project}</span>
                    <p className="text-sm text-foreground/75 leading-relaxed">
                      {item.description}
                    </p>
                    {item.slug ? (
                      <Link
                        href={`/projects/${item.slug}`}
                        className="text-sm font-medium text-claude-orange hover:underline w-fit"
                      >
                        {t("view")}
                      </Link>
                    ) : (
                      item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-claude-orange hover:underline w-fit"
                        >
                          {t("view")}
                        </a>
                      )
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

type TimelineItem = {
  key: string;
  primary: string;
  secondary: string;
  period: string;
  place?: string;
  sortKey: number;
};

function TimelineSection({
  lang,
  data,
}: {
  lang: "en" | "zh";
  data: PersonalIntroDocument;
}) {
  const t = useTranslations("Home");
  const education = (data.education[lang] || data.education.en)
    .items as EducationItem[];
  const work = (data.workingExp[lang] || data.workingExp.en)
    .items as WorkingExpItem[];

  const parseStart = (start: string) => {
    const match = start.match(/(\d{4})/);
    const monthMatch = start.match(
      /\b(January|February|March|April|May|June|July|August|September|October|November|December)\b|(\d{1,2})\s*月/,
    );
    const year = match ? Number(match[1]) : 0;
    let month = 0;
    if (monthMatch?.[1]) {
      month = Object.keys(EN_MONTH_ABBR).indexOf(monthMatch[1]) + 1;
    } else if (monthMatch?.[2]) {
      month = Number(monthMatch[2]);
    }
    return year * 100 + month;
  };

  const items: TimelineItem[] = [
    ...education.map((item, idx) => ({
      key: `edu-${idx}`,
      primary: item.school,
      secondary: item.degree,
      period: formatPeriodCompact(item.period, lang),
      place: item.location.city || undefined,
      sortKey: parseStart(item.period.start),
    })),
    ...work.map((item, idx) => ({
      key: `work-${idx}`,
      primary: item.company,
      secondary: item.position,
      period: formatPeriodCompact(item.period, lang),
      place: item.location.city || undefined,
      sortKey: parseStart(item.period.start),
    })),
  ].sort((a, b) => b.sortKey - a.sortKey);

  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className={sectionTitleClass}>{t("path")}</h2>
        <Link
          href="/about/resume"
          className="text-xs font-medium text-muted-foreground hover:text-claude-orange transition-colors shrink-0"
        >
          {t("fullResume")}
        </Link>
      </div>

      <ul className="flex flex-col border-t border-border">
        {items.map((item) => (
          <li
            key={item.key}
            className="flex flex-col gap-1 py-3.5 border-b border-border sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
          >
            <div className="flex flex-col gap-0.5 min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="font-semibold text-sm text-foreground">
                  {item.primary}
                </span>
                {item.place && (
                  <span className="text-xs text-muted-foreground">
                    {item.place}
                  </span>
                )}
              </div>
              <span className="text-sm text-foreground/75 leading-snug">
                {item.secondary}
              </span>
            </div>
            <time className="text-xs text-muted-foreground font-mono tabular-nums whitespace-nowrap shrink-0 order-first sm:order-none">
              {item.period}
            </time>
          </li>
        ))}
      </ul>
    </section>
  );
}

function LatestPostsSection({
  lang,
  posts,
}: {
  lang: "en" | "zh";
  posts: LatestPost[];
}) {
  const t = useTranslations("Home");
  if (posts.length === 0) return null;

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className={sectionTitleClass}>{t("latestWriting")}</h2>
        <Link
          href="/posts"
          className="text-xs font-medium text-muted-foreground hover:text-claude-orange transition-colors shrink-0"
        >
          {t("allPosts")}
        </Link>
      </div>

      <ul className="flex flex-col">
        {posts.map((post) => {
          const dateLabel = formatPostDate(
            post.update_date || post.create_date,
            lang,
          );
          return (
            <li key={post.id} className="border-t border-border first:border-t-0">
              <Link
                href={`/posts/${post.id}`}
                className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6 py-3 transition-colors"
              >
                <span className="text-sm font-medium group-hover:text-claude-orange transition-colors text-balance">
                  {post.title}
                </span>
                {dateLabel && (
                  <span className="text-xs text-muted-foreground font-mono tabular-nums shrink-0">
                    {dateLabel}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function PersonalIntroduction({
  lang = "en",
  latestPosts = [],
  data,
}: {
  lang?: "en" | "zh";
  latestPosts?: LatestPost[];
  data: PersonalIntroDocument;
}) {
  return (
    <div className="flex flex-col w-full py-8 px-4 gap-14">
      <Hero lang={lang} data={data} />
      <FeaturedSection lang={lang} data={data} />
      <TimelineSection lang={lang} data={data} />
      <LatestPostsSection lang={lang} posts={latestPosts} />
    </div>
  );
}
