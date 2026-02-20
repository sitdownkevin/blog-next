import Image from "next/image";
import Link from "next/link";
import { Anton, Noto_Serif_SC } from "next/font/google";
import abstractData from "../../../content/data/personal-intro/abstract.json";
import educationData from "../../../content/data/personal-intro/education.json";
import workingExpData from "../../../content/data/personal-intro/working-exp.json";
import projectsData from "../../../content/data/personal-intro/projects.json";
import publicationsData from "../../../content/data/personal-intro/publications.json";

const nameDisplayFont = Anton({
  weight: ["400"],
  variable: "--font-anton",
  subsets: ["latin"],
});

const chineseFallbackFont = Noto_Serif_SC({
  weight: ["800"],
  variable: "--font-noto-serif-sc",
  subsets: ["latin"],
});

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

  const titleFontClass = `${nameDisplayFont.variable} ${chineseFallbackFont.variable}`;
  const titleStyle = {
    fontFamily: "var(--font-anton), var(--font-noto-serif-sc), sans-serif",
  };

  return (
    <div>
      {/* Mobile view */}
      <div className="block md:hidden pb-8">
        <div className="flex flex-col space-y-4">
          <h1
            className={`${titleFontClass} text-4xl uppercase leading-tight text-claude-orange pb-2`}
            style={titleStyle}
          >
            {fullName}
          </h1>
          <div className="flex flex-col space-y-0">
            <span className="text-xs text-gray-500 dark:text-gray-300">
              {data.email}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-300">
              {locationStr}
            </span>
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-300">
            {data.intro}
          </span>
        </div>
      </div>

      {/* Tablet view */}
      <div className="hidden md:block lg:hidden pb-8">
        <div className="flex flex-col space-y-4">
          <h1
            className={`${titleFontClass} text-5xl uppercase leading-tight text-claude-orange pb-2`}
            style={titleStyle}
          >
            {fullName}
          </h1>
          <div className="flex flex-col space-y-0">
            <span className="text-xs text-gray-500 dark:text-gray-300">
              {data.email}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-300">
              {locationStr}
            </span>
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-300">
            {data.intro}
          </span>
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden lg:block pb-8">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col space-y-4">
            <h1
              className={`${titleFontClass} text-6xl uppercase tracking-[0.12em] leading-tight text-claude-orange pb-2`}
              style={titleStyle}
            >
              {fullName}
            </h1>
            <div className="flex flex-col space-y-0">
              <span className="text-xs text-gray-500 dark:text-gray-300">
                {data.email}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-300">
                {locationStr}
              </span>
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-300">
              {data.intro}
            </span>
          </div>
          <div className="w-24">
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
    <div className="flex flex-col space-y-4">
      <h2
        className={`${nameDisplayFont.variable} ${chineseFallbackFont.variable} text-2xl uppercase`}
        style={{
          fontFamily:
            "var(--font-anton), var(--font-noto-serif-sc), sans-serif",
        }}
      >
        {title}
      </h2>
      {data.items.map((item: EducationItem, idx: number) => (
        <div key={idx} className="flex flex-col">
          {/* Mobile/Tablet: Single line */}
          <span className="font-bold lg:hidden">
            {item.school}, {item.location.city}
          </span>
          {/* Desktop: Split layout */}
          <div className="hidden lg:flex justify-between items-baseline">
            <span className="font-bold">{item.school}</span>
            <span className="font-bold text-gray-500 dark:text-gray-400">
              {item.location.city}
            </span>
          </div>
          <span className="italic text-gray-600 dark:text-gray-300">
            {item.degree}
          </span>
          <span className="text-gray-600 dark:text-gray-300 text-sm">
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
    <div className="flex flex-col space-y-4">
      <h2
        className={`${nameDisplayFont.variable} ${chineseFallbackFont.variable} text-2xl uppercase`}
        style={{
          fontFamily:
            "var(--font-anton), var(--font-noto-serif-sc), sans-serif",
        }}
      >
        {title}
      </h2>
      {data.items.map((item: WorkingExpItem, idx: number) => (
        <div key={idx} className="flex flex-col">
          {/* Mobile/Tablet: Single line */}
          <span className="font-bold lg:hidden">
            {item.company}, {item.location.city}
          </span>
          {/* Desktop: Split layout */}
          <div className="hidden lg:flex justify-between items-baseline">
            <span className="font-bold">{item.company}</span>
            <span className="font-bold text-gray-500 dark:text-gray-400">
              {item.location.city}
            </span>
          </div>
          <span className="italic text-gray-600 dark:text-gray-300">
            {item.position}
          </span>
          {item.tags.length > 0 && (
            <span className="text-gray-600 dark:text-gray-300">
              {item.tags.join(", ")}
            </span>
          )}
          <span className="text-gray-600 dark:text-gray-300 text-sm">
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
    <div className="flex flex-col space-y-4">
      <h2
        className={`${nameDisplayFont.variable} ${chineseFallbackFont.variable} text-2xl uppercase`}
        style={{
          fontFamily:
            "var(--font-anton), var(--font-noto-serif-sc), sans-serif",
        }}
      >
        {title}
      </h2>
      {data.items.map((item: ProjectItem, idx: number) => (
        <div key={idx} className="flex flex-col">
          {/* Mobile/Tablet: Single line */}
          <span className="font-bold lg:hidden">
            {item.project}, {item.location.city}
          </span>
          {/* Desktop: Split layout */}
          <div className="hidden lg:flex justify-between items-baseline">
            <span className="font-bold">{item.project}</span>
            <span className="font-bold text-gray-500 dark:text-gray-400">
              {item.location.city}
            </span>
          </div>
          <span className="italic text-gray-600 dark:text-gray-300">
            {item.description}
          </span>
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
    <div className="flex flex-col space-y-4">
      <h2
        className={`${nameDisplayFont.variable} ${chineseFallbackFont.variable} text-2xl uppercase`}
        style={{
          fontFamily:
            "var(--font-anton), var(--font-noto-serif-sc), sans-serif",
        }}
      >
        {title}
      </h2>
      {data.items.map((item: PublicationItem, idx: number) => (
        <div key={idx} className="flex flex-col">
          <p className="text-gray-600 dark:text-gray-300 text-sm hanging-indent">
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

      <div className="flex flex-col space-y-4">
        <EducationSection lang={lang} />
        <WorkingExperienceSection lang={lang} />
        <ProjectsSection lang={lang} />
        <PublicationsSection lang={lang} />
      </div>
    </div>
  );
}
