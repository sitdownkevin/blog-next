import CvSectionElement from "@/components/CV";
import { PersonalInfo, CvSection } from "@/components/CV";

export default function Page() {
  const personalInfo: PersonalInfo = {
    name: "Ke Xu",
    email: "kexu567@gmail.com",
    location: "Shanghai, China",
    intro: "Information Systems, Data Mining, and Blockchain Technology.",
    figurePath: "/kexu_photo.jpg",
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
      title: "Work Experience",
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
        {
          title: "",
          subtitle: "",
          content:
            "Xu, K., Chen, Y., & Nie, J. (2023). Subclass classification of ancient glassware based on K-Means and GMM. Highlights in Science, Engineering and Technology, 42, 277-284.",
          period: "",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center">
      <CvSectionElement personalInfo={personalInfo} data={data} />
    </div>
  );
}
