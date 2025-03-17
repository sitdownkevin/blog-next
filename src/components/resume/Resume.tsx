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
        website: "www.kevinxu.site",
    }


    const educationElements: EducationElementType[] = [
        {
            school: "Tongji University - School of Economics and Management",
            location: "Shanghai",
            degree: "Master of Management Science and Engineering: Information Systems",
            period: "Sep 2024 - Present",
            content: [
                "Relevant Courses: Database System, Data Structure, Computer Network, Operating System, etc.",
            ],
        },
        {
            school: "Sichuan University - Pittsburg Institute",
            location: "Chengdu",
            degree: "Bachelor of Industrial Engineering",
            period: "Sep 2020 - Jun 2024",
            content: [
                "Relevant Courses: Database System, Data Structure, Computer Network, Operating System, etc.",
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
                "Data Mining, Operations System Development",
            ],
        },
        {
            company: "West China Biomedical Big Data Center",
            location: "Chengdu",
            position: "Research Assistant",
            period: "Oct 2022 - Apr 2023",
            content: [
                "Active Learning, Contrastive Learning",
            ],
        }
    ];

    const projectExperienceElements: ProjectExperienceElementType[] = [
        {
            project: "College Students' Innovation and Entrepreneurship Competition",
            location: "Chengdu",
            role: "Project Leader",
            period: "Oct 2022 - Apr 2023",
            content: [
                "National Project",
                "Design and Control Method of Modular Mechanical Prosthesis",
            ],
        }
    ];

    const additionalInformationElements: AdditionalInformationElementType[] = [
        {
            title: "Skills",
            content: "Python, SQL, Java, C++, etc.",
        },
        {
            title: "Languages",
            content: "Mandarin, English",
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
        <div className="flex flex-col gap-2">
            <Header basicInfo={basicInfo} />
            <EducationElementsCard educationElements={educationElements} />
            <WorkExperienceElementsCard workExperienceElements={workExperienceElements} />
            <ProjectExperienceElementsCard projectExperienceElements={projectExperienceElements} />
            <AdditionalInformation additionalInformationElements={additionalInformationElements} />
            <Publications publications={publications} />
        </div>
    )
}