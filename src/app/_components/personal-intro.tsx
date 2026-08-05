import Image from "next/image";
import Link from "next/link";
import abstractData from "../../../content/data/personal-intro/abstract.json";
import educationData from "../../../content/data/personal-intro/education.json";
import workingExpData from "../../../content/data/personal-intro/working-exp.json";
import projectsData from "../../../content/data/personal-intro/projects.json";
import publicationsData from "../../../content/data/personal-intro/publications.json";

const sectionTitleClass =
  "font-display text-2xl font-semibold tracking-tight text-balance";

// Type definitions based on JSON structure
type Location = {
  city: string;
  province: string;
  country: string;
};

type EducationItem = {
  school: string;
  location: Location;
  degree: string;
  period: {
    start: string;
    end: string;
  };
};

type WorkingExpItem = {
  company: string;
  location: Location;
  position: string;
  period: {
    start: string;
    end: string;
  };
  content: string[];
  tags: string[];
};

type ProjectItem = {
  project: string;
  location: Location;
  description: string;
  url: string;
};

type PublicationItem = {
  authors: string;
  year: string;
  title: string;
  journal: string;
  volume: string;
  pages: string;
  url: string;
};

// Helper function to format location
function formatLocation(location: Location): string {
  return `${location.city}, ${location.province}`;
}

// Helper function to format period
function formatPeriod(period: { start: string; end: string }): string {
  return `${period.start} - ${period.end}`;
}

// Helper function to format publication in APA style with JSX
function formatAPAPublicationJSX(pub: PublicationItem) {
  const { authors, year, title, journal, volume, pages } = pub;

  return (
    <>
      {authors} ({year}). {title}. <em>{journal}</em>
      {volume && `, ${volume}`}
      {pages && `, ${pages}`}.
    </>
  );
}

function PersonalIntroductionHeader({ lang = "en" }: { lang?: "en" | "zh" }) {
  const data = (abstractData as any)[lang] || abstractData.en;
  const fullName = `${data.name.first} ${data.name.last}`;
  const locationStr = `${data.location.city}, ${data.location.country}`;

  return (
    <div>
      {/* Mobile view */}
      <div className="block md:hidden pb-10">
        <div className="flex flex-col space-y-5">
          <h1 className="font-display text-4xl font-semibold tracking-tight leading-tight text-claude-orange text-balance pb-1">
            {fullName}
          </h1>
          <div className="flex flex-col space-y-0.5">
            <span className="text-xs font-medium text-muted-foreground">
              {data.email}
            </span>
            <span className="text-xs font-medium text-muted-foreground">
              {locationStr}
            </span>
          </div>
          <span className="text-sm text-foreground/80 leading-relaxed">
            {data.intro}
          </span>
        </div>
      </div>

      {/* Tablet view */}
      <div className="hidden md:block lg:hidden pb-10">
        <div className="flex flex-col space-y-5">
          <h1 className="font-display text-5xl font-semibold tracking-tight leading-tight text-claude-orange text-balance pb-1">
            {fullName}
          </h1>
          <div className="flex flex-col space-y-0.5">
            <span className="text-xs font-medium text-muted-foreground">
              {data.email}
            </span>
            <span className="text-xs font-medium text-muted-foreground">
              {locationStr}
            </span>
          </div>
          <span className="text-sm text-foreground/80 leading-relaxed">
            {data.intro}
          </span>
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden lg:block pb-10">
        <div className="flex flex-row justify-between gap-8">
          <div className="flex flex-col space-y-5">
            <h1 className="font-display text-6xl font-semibold tracking-tight leading-tight text-claude-orange text-balance pb-1">
              {fullName}
            </h1>
            <div className="flex flex-col space-y-0.5">
              <span className="text-xs font-medium text-muted-foreground">
                {data.email}
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                {locationStr}
              </span>
            </div>
            <span className="text-sm text-foreground/80 leading-relaxed">
              {data.intro}
            </span>
          </div>
          <div className="w-24 shrink-0">
            <Image
              src="/assets/images/figures/photo_figure.webp"
              alt="figure"
              width={2125}
              height={3217}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function EducationSection({ lang = "en" }: { lang?: "en" | "zh" }) {
  const data = (educationData as any)[lang] || educationData.en;
  const title = lang === "zh" ? "教育经历" : "Education";

  return (
    <div className="flex flex-col space-y-5">
      <h2 className={sectionTitleClass}>{title}</h2>
      {data.items.map((item: EducationItem, idx: number) => (
        <div key={idx} className="flex flex-col gap-0.5">
          {/* Mobile/Tablet: Single line */}
          <span className="font-semibold lg:hidden">
            {item.school}, {item.location.city}
          </span>
          {/* Desktop: Split layout */}
          <div className="hidden lg:flex justify-between items-baseline">
            <span className="font-semibold">{item.school}</span>
            <span className="font-medium text-muted-foreground">
              {item.location.city}
            </span>
          </div>
          <span className="italic text-foreground/80">{item.degree}</span>
          <span className="text-muted-foreground text-sm">
            {formatPeriod(item.period)}
          </span>
        </div>
      ))}
    </div>
  );
}

function WorkingExperienceSection({ lang = "en" }: { lang?: "en" | "zh" }) {
  const data = (workingExpData as any)[lang] || workingExpData.en;
  const title = lang === "zh" ? "工作经历" : "Working Experience";

  return (
    <div className="flex flex-col space-y-5">
      <h2 className={sectionTitleClass}>{title}</h2>
      {data.items.map((item: WorkingExpItem, idx: number) => (
        <div key={idx} className="flex flex-col gap-0.5">
          {/* Mobile/Tablet: Single line */}
          <span className="font-semibold lg:hidden">
            {item.company}, {item.location.city}
          </span>
          {/* Desktop: Split layout */}
          <div className="hidden lg:flex justify-between items-baseline">
            <span className="font-semibold">{item.company}</span>
            <span className="font-medium text-muted-foreground">
              {item.location.city}
            </span>
          </div>
          <span className="italic text-foreground/80">{item.position}</span>
          {item.tags.length > 0 && (
            <span className="text-muted-foreground">
              {item.tags.join(", ")}
            </span>
          )}
          <span className="text-muted-foreground text-sm">
            {formatPeriod(item.period)}
          </span>
        </div>
      ))}
    </div>
  );
}

function ProjectsSection({ lang = "en" }: { lang?: "en" | "zh" }) {
  const data = (projectsData as any)[lang] || projectsData.en;
  const title = lang === "zh" ? "项目经历" : "Projects";

  return (
    <div className="flex flex-col space-y-5">
      <h2 className={sectionTitleClass}>{title}</h2>
      {data.items.map((item: ProjectItem, idx: number) => (
        <div key={idx} className="flex flex-col gap-0.5">
          {/* Mobile/Tablet: Single line */}
          <span className="font-semibold lg:hidden">
            {item.project}, {item.location.city}
          </span>
          {/* Desktop: Split layout */}
          <div className="hidden lg:flex justify-between items-baseline">
            <span className="font-semibold">{item.project}</span>
            <span className="font-medium text-muted-foreground">
              {item.location.city}
            </span>
          </div>
          <span className="italic text-foreground/80">{item.description}</span>
          {item.url && (
            <Link
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-claude-orange hover:underline text-sm"
            >
              {item.url}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}

function PublicationsSection({ lang = "en" }: { lang?: "en" | "zh" }) {
  const data = (publicationsData as any)[lang] || publicationsData.en;
  const title = lang === "zh" ? "发表论文" : "Publications";

  return (
    <div className="flex flex-col space-y-5">
      <h2 className={sectionTitleClass}>{title}</h2>
      {data.items.map((item: PublicationItem, idx: number) => (
        <div key={idx} className="flex flex-col">
          <p className="text-foreground/80 text-sm hanging-indent leading-relaxed">
            {formatAPAPublicationJSX(item)}
            {item.url && (
              <>
                {" "}
                <Link
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-claude-orange hover:underline break-all"
                >
                  {item.url}
                </Link>
              </>
            )}
          </p>
        </div>
      ))}
    </div>
  );
}

export function PersonalIntroduction({ lang = "en" }: { lang?: "en" | "zh" }) {
  return (
    <div className="flex flex-col w-full py-8 px-4">
      <PersonalIntroductionHeader lang={lang} />

      <div className="flex flex-col space-y-10">
        <EducationSection lang={lang} />
        <WorkingExperienceSection lang={lang} />
        <ProjectsSection lang={lang} />
        <PublicationsSection lang={lang} />
      </div>
    </div>
  );
}
