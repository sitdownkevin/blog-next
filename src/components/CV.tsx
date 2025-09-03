import Image from "next/image";

type PersonalInfo = {
  name: string;
  email: string;
  location: string;
  intro: string;
  figurePath: string;
};

type CvItem = {
  title?: string;
  subtitle?: string;
  content?: string;
  period?: string;
};

type CvSection = {
  title: string;
  items: CvItem[];
};

function CvHeader({ personalInfo }: { personalInfo: PersonalInfo }) {
  return (
    <div>
      <div className="block md:hidden pb-8">
        <div className="flex flex-col space-y-4">
          <h1 className="text-4xl font-serif text-claude-orange border-b-1 border-gray-300 pb-2">
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

      <div className="hidden md:block lg:hidden pb-8">
        <div className="flex flex-col space-y-4">
          <h1 className="text-5xl font-serif text-claude-orange border-b-1 border-gray-300 pb-2">
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

      <div className="hidden lg:block pb-8">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col space-y-4">
            <h1 className="text-6xl font-serif text-claude-orange border-b-1 border-gray-300 pb-2">
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

      {/* <div className="block md:hidden py-8">
        <div className="flex flex-col space-y-4 justify-center items-center">
          <h1 className="text-4xl font-serif text-claude-orange">{personalInfo.name}</h1>
          <div className="flex flex-col space-y-0">
            <span className="text-xs text-gray-500 dark:text-gray-300">{personalInfo.email}</span>
            <span className="text-xs text-gray-500 dark:text-gray-300">
              {personalInfo.location}
            </span>
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-300">{personalInfo.intro}</span>
        </div>
      </div> */}

      {/* <div className="hidden md:block py-8">
        <div className="flex flex-row justify-between">
          <div className="col-span-6 md:col-span-5 space-y-4 flex flex-col justify-center items-center md:items-start">
            <h1 className="text-5xl font-serif text-claude-orange">{personalInfo.name}</h1>
            <div className="flex flex-col space-y-0">
              <span className="text-xs text-gray-500 dark:text-gray-300">
                {personalInfo.email}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-300">
                {personalInfo.location}
              </span>
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-300">{personalInfo.intro}</span>
          </div>
          <Image
            src={personalInfo.figurePath}
            alt="figure"
            width={2125}
            height={3217}
            className="hidden lg:block w-20 rounded-lg shadow-xs shadow-gray-500/50"
          />
        </div>
      </div> */}
    </div>
  );
}

function CvItemElement({ cvItem }: { cvItem: CvItem }) {
  return (
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

export default function CvSectionElement() {
  const personalInfo: PersonalInfo = {
    name: "Ke Xu",
    email: "kexu567@gmail.com",
    location: "Shanghai, China",
    intro: "Information Systems, Data Mining, and Blockchain Technology.",
    figurePath: "/assets/images/figures/photo_figure.webp",
  };

  const data: CvSection[] = [
    {
      title: "Education",
      items: [
        {
          title: "Tongji University, Shanghai",
          subtitle: "Master's Degree in Management Science and Engineering",
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
          content:
            "Xu, K., Hu, W., & Zhou, Z. (2024). The impact of reward distribution policies on user engagement and service consumption: A natural experiment at a cloud computing service provider. China Association for Information Systems Annual Meeting (CNAIS) 2024.",
          period: "",
        },
        {
          title: "",
          subtitle: "",
          content:
            "Xu, K., Nie, J., Chen, Y., Ban, Z., Liu, D., & Yin, R. (2024). Predicting intensive care unit length of stay for inflammatory bowel diseases patients using machine learning. In F. Tosi et al. (Eds.), Springer Series in Design and Innovation.",
          period: "",
        },
      ],
    },
  ];

  return (
    <>
      <div className="flex flex-col w-full mt-8">
        <CvHeader personalInfo={personalInfo} />

        <div className="flex flex-col space-y-4">
          {data.map((section, index) => (
            <div key={index} className="flex flex-col space-y-4">
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              {section.items.map((item, idx) => (
                <CvItemElement key={idx} cvItem={item} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
