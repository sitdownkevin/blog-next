import {
  BasicInfoType,
  EducationElementType,
  WorkExperienceElementType,
  ProjectExperienceElementType,
  AdditionalInformationElementType,
  PublicationElementType,
} from "@/lib/resume/types";

export const basicInfo: BasicInfoType = {
  name: {
    first_name: "Ke",
    last_name: "Xu",
    first_name_en: "Kevin",
    last_name_en: "Xu",
  },
  email: "kexu567@gmail.com",
  phone: {
    prefix: "+86",
    number: "155 5867 3178",
  },
  website: "kexu.win",
  github: "sitdownkevin",
};

export const educationElements: EducationElementType[] = [
  {
    school: "Tongji University - School of Economics and Management",
    location: "Shanghai",
    degree: "Master of Management Science and Engineering: Information Systems",
    period: "Sep 2024 - Present",
    content: [
      "Successive Master-Doctor Program",
      "Research Interest: Web3, Blockchain Technology, and Artificial Intelligence",
    ],
  },
  {
    school: "Sichuan University - Pittsburg Institute",
    location: "Chengdu",
    degree: "Bachelor of Industrial Engineering",
    period: "Sep 2020 - Jun 2024",
    content: ["GPA: 3.93/4.00"],
  },
];

export const workExperienceElements: WorkExperienceElementType[] = [
  {
    company: "AIRBUS",
    location: "Beijing",
    position: "Engineering Intern",
    period: "Jan 2024 - May 2024",
    content: [
      "Operations System Development",
      "Kanban System Development with Python (Streamlit, Pandas, NumPy, etc.), SQL, and JavaScript",
    ],
  },
  {
    company: "West China Biomedical Big Data Center",
    location: "Chengdu",
    position: "Research Assistant",
    period: "Oct 2022 - Apr 2023",
    content: [
      "Deep Learning (Active Learning, Contrastive Learning) on Medical Image Data with Python (PyTorch, Scikit-learn, etc.), MATLAB, and R",
    ],
  },
];

export const projectExperienceElements: ProjectExperienceElementType[] = [
  {
    project: "AI Mobile Large Model Technology Innovation Competition",
    location: "Shenzhen",
    role: "2nd Xingzhi Cup (兴智杯) National AI Innovation Application Competition",
    content: [
      "National First Prize (全国一等奖), AI mobile large model technology innovation track",
    ],
  },
  {
    project: "Design and Control Method of Modular Mechanical Prosthesis",
    location: "China",
    role: "Project Leader",
    content: [
      "A National Project of College Students' Innovation and Entrepreneurship Competition",
      "Responsible for the design of the mechanical prosthesis with SolidWorks, the control panel with Vue.js, and the communication program with C++",
    ],
  },
  {
    project: "Blackboard Enhanced Extension",
    location: "",
    role: "github.com/sitdownkevin/Blackboard-Enhanced",
    content: [
      "A Chrome extension that enhances the functionality of Blackboard, a popular educational management system widely used in universities. Developed with React",
    ],
  },
  {
    project: "DORM WIFI",
    location: "",
    role: "sitdownkevin.github.io/dorm-wifi-tauri",
    content: [
      "A WiFi connection utility for Tongji University that enables automatic authentication and seamless connectivity",
      "Built a cross-platform desktop application using Tauri framework with Rust backend and TypeScript frontend",
      "Developed companion mobile app using React Native and Expo framework",
    ],
  },
  {
    project: "Blog Next",
    location: "",
    role: "github.com/sitdownkevin/blog-next",
    content: [
      "A personal blog developed with Next.js, Tailwind CSS, and TypeScript",
    ],
  },
  {
    project: "Folo",
    location: "",
    role: "follow.is",
    content: [
      "Contributed to the open-source project RSSHub, by creating RSS rules for follow.is",
    ],
  },
];

export const additionalInformationElements: AdditionalInformationElementType[] =
  [
    {
      title: "Programming Languages",
      content: "Python, JavaScript, TypeScript, R, SQL, Stata, etc.",
    },
    {
      title: "Frontend",
      content: "React, Next.js, Vue.js, Tailwind CSS, etc.",
    },
    {
      title: "Frameworks",
      content: "Pandas, NumPy, PyTorch, LangChain, Streamlit, Flask, etc.",
    },
    {
      title: "Languages",
      content: "Mandarin, English (TOEFL 94)",
    },
    {
      title: "Hobbies",
      content: "Trading, traveling, and enjoying delicious food",
    },
  ];

export const publications: PublicationElementType[] = [
  {
    content:
      "Peng, B., Xu, K., & Pan, Y. (2026). STD-Former: Image-conditioned texture dictionary encoding with sparse topological supervision for texture recognition. International Conference on Machine Learning (ICML) 2026. https://icml.cc/virtual/2026/poster/60791",
  },
  {
    content:
      "Pan, Y., Xu, K., & Peng, B. (2026). Topology-enhanced alignment for large language models: Trajectory topology loss and topological preference optimization. In Findings of the Association for Computational Linguistics: ACL 2026, pages 24807-24821. https://aclanthology.org/2026.findings-acl.1242/",
  },
  {
    content:
      "Xu, K., Hu, W., & Zhou, Z. (2025). Claiming vs. automatic rewards: Impact of incentive mechanism on engagement and consumption in cloud computing. International Conference on Information Systems (ICIS) 2025 Proceedings. https://aisel.aisnet.org/icis2025/user_behav/user_behav/15",
  },
  {
    content:
      "Xu, K., Nie, J., Chen, Y., Ban, Z., Liu, L., Li, K., Liu, D., & Yin, R. (2025). Predicting intensive care unit length of stay for inflammatory bowel diseases patients using machine learning. Proceedings of the 22nd Congress of the International Ergonomics Association, 1, 255-261. https://doi.org/10.1007/978-981-95-0211-0_40",
  },
];
