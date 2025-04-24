"use client";

import { BasicInfoType, EducationElementType, WorkExperienceElementType, ProjectExperienceElementType, AdditionalInformationElementType, PublicationElementType } from "@/lib/resume/types";
import EducationElementsCard from "@/components/resume/Education";
import Header from "@/components/resume/Header";
import WorkExperienceElementsCard from "@/components/resume/WorkExperience";
import ProjectExperienceElementsCard from "@/components/resume/ProjectExperience";
import AdditionalInformation from "@/components/resume/AdditionalInformation";
import Publications from "@/components/resume/Publications";

export default function Resume() {
    const basicInfo: BasicInfoType = {
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
    }


    const educationElements: EducationElementType[] = [
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
            content: [
                "GPA: 3.93/4.00",
            ],
        }
    ];

    const workExperienceElements: WorkExperienceElementType[] = [
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
        }
    ];

    const projectExperienceElements: ProjectExperienceElementType[] = [
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
                "Developed companion mobile app using React Native and Expo framework"
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
        }
    ];

    const additionalInformationElements: AdditionalInformationElementType[] = [
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
        }
    ];

    const publications: PublicationElementType[] = [
        {
            content: "Xu, K., Hu, W., & Zhou, Z. (2024). The impact of reward distribution policies on user engagement and service consumption: A natural experiment at a cloud computing service provider. China Association for Information Systems Annual Meeting (CNAIS) 2024.",
        },
        {
            content: "Xu, K., Nie, J., Chen, Y., Ban, Z., Liu, D., & Yin, R. (2024). Predicting intensive care unit length of stay for inflammatory bowel diseases patients using machine learning. In F. Tosi et al. (Eds.), Springer Series in Design and Innovation."
        }
    ];


    return (
        <div className="flex flex-col gap-2 sm:gap-1">
            <div className="">
                <div className="">
                    <div className="flex justify-end mb-4">
                    </div>
                    <div className="">
                        <Header basicInfo={basicInfo} />
                        <EducationElementsCard educationElements={educationElements} />
                        <WorkExperienceElementsCard workExperienceElements={workExperienceElements} />
                        <ProjectExperienceElementsCard projectExperienceElements={projectExperienceElements} />
                        <AdditionalInformation additionalInformationElements={additionalInformationElements} />
                        <Publications publications={publications} />
                    </div>
                </div>
            </div>
        </div>
    )
}