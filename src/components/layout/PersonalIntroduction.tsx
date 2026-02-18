import Image from "next/image";

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
          <h1 className="text-4xl font-sans text-claude-orange pb-2">
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
          <h1 className="text-5xl font-sans text-claude-orange pb-2">
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
            <h1 className="text-6xl font-sans text-claude-orange pb-2">
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
          <span className={"text-gray-600 dark:text-gray-300"}>
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

export default function PersonalIntroduction() {
  const personalInfo: PersonalInfo = {
    name: "Ke Xu",
    email: "kexu567@gmail.com",
    location: "Shanghai, China",
    intro: "Information Systems, Data Mining, and Blockchain Technology.",
    figurePath: "/assets/images/figures/photo_figure.webp",
  };

  const data: PersonalIntroductionSection[] = [
    {
      title: "Education",
      items: [
        {
          title: "Tongji University, Shanghai",
          subtitle: "Second-year Student in Integrated Master's-PhD Program in Management Science and Engineering",
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
            "Design and Control Method of Modular Mechanical Prosthesis, China",
          subtitle:
            "College Students' Innovation and Entrepreneurship Competition",
          content: "National Project",
          period: "",
        },
      ],
    },
    {
      title: "Publications",
      items: [
        {
          title: "",
          subtitle: "",
          content: "Xu, Ke; HU, Wei; and Zhou, Zhongyun, Claiming vs. Automatic Rewards: Impact of Incentive Mechanism on Engagement and Consumption in Cloud Computing (2025). ICIS 2025 Proceedings. 15.",
          period: "",
        },
        // {
        //   title: "",
        //   subtitle: "",
        //   content:
        //     "Xu, K., Hu, W., & Zhou, Z. (2024). The impact of reward distribution policies on user engagement and service consumption: A natural experiment at a cloud computing service provider. China Association for Information Systems Annual Meeting (CNAIS) 2024.",
        //   period: "",
        // },
        {
          title: "",
          subtitle: "",
          content:
            "Xu, K. et al. (2025). Predicting Intensive Care Unit Length of Stay for Inflammatory Bowel Diseases Patients Using Machine Learning. In: Jin, S., Kim, J.H., Kong, YK., Park, J., Yun, M.H. (eds) Proceedings of the 22nd Congress of the International Ergonomics Association, Volume 1. IEA 2024. Springer Series in Design and Innovation, vol 39. Springer, Singapore. https://doi.org/10.1007/978-981-95-0211-0_40",
          period: "",
        },
      ],
    },
  ];

  return (
    <div>
      <div className="flex flex-col w-full mt-8">
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
    </div>
  );
}
