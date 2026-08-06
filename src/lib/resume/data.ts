import {
  BasicInfoType,
  EducationElementType,
  WorkExperienceElementType,
  ProjectExperienceElementType,
  AdditionalInformationElementType,
  PublicationElementType,
} from "@/lib/resume/types";
import type { AppLocale } from "@/i18n/routing";

export type ResumeLocaleData = {
  basicInfo: BasicInfoType;
  educationElements: EducationElementType[];
  workExperienceElements: WorkExperienceElementType[];
  projectExperienceElements: ProjectExperienceElementType[];
  additionalInformationElements: AdditionalInformationElementType[];
  publications: PublicationElementType[];
};

const publications: PublicationElementType[] = [
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

const en: ResumeLocaleData = {
  basicInfo: {
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
  },
  educationElements: [
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
  ],
  workExperienceElements: [
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
  ],
  projectExperienceElements: [
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
  ],
  additionalInformationElements: [
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
  ],
  publications,
};

const zh: ResumeLocaleData = {
  basicInfo: {
    name: {
      first_name: "可",
      last_name: "徐",
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
  },
  educationElements: [
    {
      school: "同济大学 · 经济与管理学院",
      location: "上海",
      degree: "管理科学与工程（信息系统）硕博连读",
      period: "2024 年 9 月 - 至今",
      content: [
        "硕博连读培养",
        "研究方向：Web3、区块链技术与人工智能",
      ],
    },
    {
      school: "四川大学 · 匹兹堡学院",
      location: "成都",
      degree: "工业工程学士",
      period: "2020 年 9 月 - 2024 年 6 月",
      content: ["GPA：3.93/4.00"],
    },
  ],
  workExperienceElements: [
    {
      company: "空中客车（AIRBUS）",
      location: "北京",
      position: "工程实习生",
      period: "2024 年 1 月 - 2024 年 5 月",
      content: [
        "运营系统开发",
        "使用 Python（Streamlit、Pandas、NumPy 等）、SQL 与 JavaScript 开发看板系统",
      ],
    },
    {
      company: "华西生物医学大数据中心",
      location: "成都",
      position: "研究助理",
      period: "2022 年 10 月 - 2023 年 4 月",
      content: [
        "面向医学影像数据的深度学习研究（主动学习、对比学习），使用 Python（PyTorch、Scikit-learn 等）、MATLAB 与 R",
      ],
    },
  ],
  projectExperienceElements: [
    {
      project: "AI 手机大模型技术创新赛",
      location: "深圳",
      role: "第二届兴智杯全国人工智能创新应用大赛",
      content: ["全国一等奖，AI 手机大模型技术创新赛道"],
    },
    {
      project: "模块化机械义肢设计与控制方法",
      location: "中国",
      role: "项目负责人",
      content: [
        "全国大学生创新创业训练计划项目",
        "负责使用 SolidWorks 进行机械义肢设计、使用 Vue.js 开发控制面板，以及使用 C++ 编写通信程序",
      ],
    },
    {
      project: "Blackboard Enhanced 浏览器扩展",
      location: "",
      role: "github.com/sitdownkevin/Blackboard-Enhanced",
      content: [
        "增强高校广泛使用的 Blackboard 教学管理系统功能的 Chrome 扩展，基于 React 开发",
      ],
    },
    {
      project: "DORM WIFI",
      location: "",
      role: "sitdownkevin.github.io/dorm-wifi-tauri",
      content: [
        "面向同济大学的宿舍 WiFi 连接工具，支持自动认证与无缝联网",
        "使用 Tauri 框架构建跨平台桌面应用，Rust 后端与 TypeScript 前端",
        "配套移动端应用使用 React Native 与 Expo 开发",
      ],
    },
    {
      project: "Blog Next",
      location: "",
      role: "github.com/sitdownkevin/blog-next",
      content: ["基于 Next.js、Tailwind CSS 与 TypeScript 开发的个人博客"],
    },
    {
      project: "Folo",
      location: "",
      role: "follow.is",
      content: ["为开源项目 RSSHub 贡献 follow.is 的 RSS 订阅规则"],
    },
  ],
  additionalInformationElements: [
    {
      title: "编程语言",
      content: "Python、JavaScript、TypeScript、R、SQL、Stata 等",
    },
    {
      title: "前端",
      content: "React、Next.js、Vue.js、Tailwind CSS 等",
    },
    {
      title: "框架与工具",
      content: "Pandas、NumPy、PyTorch、LangChain、Streamlit、Flask 等",
    },
    {
      title: "语言能力",
      content: "中文（母语）、英语（TOEFL 94）",
    },
    {
      title: "兴趣爱好",
      content: "交易、旅行与美食",
    },
  ],
  publications,
};

export const resumeData: Record<AppLocale, ResumeLocaleData> = {
  en,
  zh,
};

export function getResumeData(locale: AppLocale): ResumeLocaleData {
  return resumeData[locale] ?? resumeData.en;
}
