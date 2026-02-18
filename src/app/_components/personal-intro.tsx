import Image from "next/image";
import { Anton } from "next/font/google";

const nameDisplayFont = Anton({
  weight: ["400"],
});

type PersonalInfo = {
  name: string;
  email: string;
  location: string;
  intro: string;
  figurePath: string;
};

type PersonalIntroductionItem = {
  title?: string;
  subtitle?: string;
  content?: string;
  period?: string;
};

type PersonalIntroductionSection = {
  title: string;
  items: PersonalIntroductionItem[];
};

function PersonalIntroductionHeader({
  personalInfo,
}: {
  personalInfo: PersonalInfo;
}) {
  return (
    <div>
      {/* Mobile view */}
      <div className="block md:hidden pb-8">
        <div className="flex flex-col space-y-4">
          <h1
            className={`${nameDisplayFont.className} text-4xl uppercase tracking-[0.12em] leading-tight text-claude-orange pb-2`}
          >
            {personalInfo.name}
          </h1>
          <div className="flex flex-col space-y-0">
            <span className="text-xs text-gray-500 dark:text-gray-300">
              {personalInfo.email}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-300">
              {personalInfo.location}
            </span>
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-300">
            {personalInfo.intro}
          </span>
        </div>
      </div>

      {/* Tablet view */}
      <div className="hidden md:block lg:hidden pb-8">
        <div className="flex flex-col space-y-4">
          <h1
            className={`${nameDisplayFont.className} text-5xl uppercase tracking-[0.12em] leading-tight text-claude-orange pb-2`}
          >
            {personalInfo.name}
          </h1>
          <div className="flex flex-col space-y-0">
            <span className="text-xs text-gray-500 dark:text-gray-300">
              {personalInfo.email}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-300">
              {personalInfo.location}
            </span>
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-300">
            {personalInfo.intro}
          </span>
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden lg:block pb-8">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col space-y-4">
            <h1
              className={`${nameDisplayFont.className} text-6xl uppercase tracking-[0.12em] leading-tight text-claude-orange pb-2`}
            >
              {personalInfo.name}
            </h1>
            <div className="flex flex-col space-y-0">
              <span className="text-xs text-gray-500 dark:text-gray-300">
                {personalInfo.email}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-300">
                {personalInfo.location}
              </span>
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-300">
              {personalInfo.intro}
            </span>
          </div>
          <div className="w-24">
            <Image
              src={personalInfo.figurePath}
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

function PersonalIntroductionItemElement({
  cvItem,
}: {
  cvItem: PersonalIntroductionItem;
}) {
  return (
    // @ts-ignore
    <p>
      {cvItem.title ? (
        <span className={"font-bold"}>{cvItem.title}</span>
      ) : null}
      {cvItem.subtitle ? (
        <>
          {cvItem.title ? <br /> : null}
          <span className={"italic text-gray-600 dark:text-gray-300"}>
            {cvItem.subtitle}
          </span>
        </>
      ) : null}
      {cvItem.content ? (
        <>
          {cvItem.title || cvItem.subtitle ? <br /> : null}
          <span className="text-gray-600 dark:text-gray-300 wrap-break-words whitespace-pre-line">
            {cvItem.content}
          </span>
        </>
      ) : null}
      {cvItem.period ? (
        <>
          {cvItem.title || cvItem.subtitle || cvItem.content ? <br /> : null}
          <span className={"text-gray-600 dark:text-gray-300 text-sm"}>
            {cvItem.period}
          </span>
        </>
      ) : null}
    </p>
  );
}

export function PersonalIntroduction() {
  const personalInfo: PersonalInfo = {
    name: "Ke Xu",
    email: "kexu567@gmail.com",
    location: "Shanghai, China",
    intro: "Blockchain Technology, Data Mining, and Machine Learning.",
    figurePath: "/assets/images/figures/photo_figure.webp",
  };

  const data: PersonalIntroductionSection[] = [
    {
      title: "Education",
      items: [
        {
          title: "Tongji University, Shanghai",
          subtitle: "Ph.D. Candidate in Information Systems",
          content: "",
          period: "September 2024 - Present",
        },
        {
          title: "Sichuan University, Chengdu",
          subtitle: "Bachelor's Degree in Industrial Engineering",
          content: "",
          period: "September 2020 - June 2024",
        },
      ],
    },
    {
      title: "Working Experience",
      items: [
        {
          title: "Airbus Beijing Engineering Centre (ABEC), Beijing",
          subtitle: "Engineering Intern at ACO1I",
          content: "Data Mining, Operations System Development",
          period: "January 2024 - May 2024",
        },
        {
          title: "West China Biomedical Big Data Center, Chengdu",
          subtitle: "Research Assistant",
          content: "Active Learning, Contrastive Learning",
          period: "October 2022 - April 2023",
        },
      ],
    },
    {
      title: "Projects",
      items: [
        {
          title:
            "AI Mobile Large Model Technology Innovation Competition, Shenzhen",
          subtitle:
            "2nd 'Xingzhi Cup' National AI Innovation Application Competition",
          content: "First Prize (National Finals)",
          period: "December 2025",
        },
        {
          title:
            "Design and Control Method of Modular Mechanical Prosthesis, Chengdu",
          subtitle:
            "College Students' Innovation and Entrepreneurship Competition",
          content: "National Project",
          period: "December 2023 - December 2024",
        },
      ],
    },
    {
      title: "Publications",
      items: [
        {
          title: "",
          subtitle: "",
          content:
            "Xu, K., Hu, W., & Zhou, Z. (2025). Claiming vs. automatic rewards: Impact of incentive mechanism on engagement and consumption in cloud computing. ICIS 2025 Proceedings, 15.",
          period: "",
        },
        {
          title: "",
          subtitle: "",
          content:
            "Xu, K., Nie, J., Chen, Y., Ban, Z., Liu, L., Li, K., Liu, D., & Yin, R. (2025). Predicting intensive care unit length of stay for inflammatory bowel diseases patients using machine learning. In S. Jin, J. H. Kim, Y.-K. Kong, J. Park, & M. H. Yun (Eds.), Proceedings of the 22nd Congress of the International Ergonomics Association, Volume 1 (pp. 255–261). Springer. https://doi.org/10.1007/978-981-95-0211-0_40",
          period: "",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col w-full py-8 px-4">
      <PersonalIntroductionHeader personalInfo={personalInfo} />

      <div className="flex flex-col space-y-4">
        {data.map((section, index) => (
          <div key={index} className="flex flex-col space-y-4">
            <h2 className="text-2xl font-semibold">{section.title}</h2>
            {section.items.map((item, idx) => (
              <PersonalIntroductionItemElement key={idx} cvItem={item} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
