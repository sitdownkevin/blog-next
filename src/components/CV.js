// import { PersonalInfoCardHeader } from '@/components/ClientComponent'

import Image from "next/image";

function CVItem({ title, subtitle, content, period }) {
    return <p>
        {title ? <span className={"font-bold"}>{title}</span> : null}
        {subtitle ? <>{title ? <br /> : null}<span className={"italic text-gray-600"}>{subtitle}</span></> : null}
        {content ? <>{title || subtitle ? <br /> : null}<span className={"text-gray-600"}>{content}</span></> : null}
        {period ? <>{title || subtitle || content ? <br /> : null}<span className={"text-gray-600 text-sm"}>{period}</span></> : null}
    </p>
}



function PersonalInfoCardHeader() {
    const personalInfo = {
        name: "Ke Xu",
        email: "kexu567@gmail.com",
        location: "Shanghai, China",
        intro: "Information Systems, Data Mining, and Blockchain Technology.",
        figurePath: "/kexu_photo.jpg",
    }


    return (
        <>
            <div className="block md:hidden py-8">
                <div className="flex flex-col space-y-4 justify-center items-center">
                    <h1 className="text-4xl font-mono">{personalInfo.name}</h1>
                    <div className="flex flex-col space-y-0">
                        <span className="text-xs text-gray-500">{personalInfo.email}</span>
                        <span className="text-xs text-gray-500">{personalInfo.location}</span>
                    </div>
                    <span className="text-xs text-gray-600">
                        {personalInfo.intro}
                    </span>
                </div>
            </div>

            <div className="hidden md:block py-8">
                <div className="grid grid-cols-6">
                    <div className="col-span-6 md:col-span-5 space-y-4 flex flex-col justify-center items-center md:items-start">
                        <h1 className="text-5xl font-mono">{personalInfo.name}</h1>
                        <div className="flex flex-col space-y-0">
                            <span className="text-xs text-gray-500">{personalInfo.email}</span>
                            <span className="text-xs text-gray-500">{personalInfo.location}</span>
                        </div>
                        <span className="text-xs text-gray-600">
                            {personalInfo.intro}
                        </span>
                    </div>
                    <Image 
                        src={personalInfo.figurePath}
                        alt="figure"
                        width={2125}
                        height={3217}
                        className="hidden lg:block w-20 rounded-lg shadow-sm shadow-gray-500/50"
                    />
                </div>
            </div>

        </>
    )
}



export function CV() {
    var cvJSONData = {
        "Education": [
            {
                "title": "Tongji University, Shanghai",
                "subtitle": "Master's Degree in Management Science and Engineering",
                "content": "",
                "period": "September 2024 - Present"
            },
            {
                "title": "Sichuan University, Chengdu",
                "subtitle": "Bachelor's Degree in Industrial Engineering",
                "content": "",
                "period": "September 2020 - June 2024"
            }
        ],
        "Work Experience": [
            {
                "title": "Airbus Beijing Engineering Centre (ABEC), Beijing",
                "subtitle": "Engineering Intern at ACO1I",
                "content": "Data Mining, Operations System Development",
                "period": "January 2024 - May 2024"
            },
            {
                "title": "West China Biomedical Big Data Center, Chengdu",
                "subtitle": "Research Assistant",
                "content": "Active Learning, Contrastive Learning",
                "period": "October 2022 - April 2023"
            }
        ],
        "Projects": [
            {
                "title": "Design and Control Method of Modular Mechanical Prosthesis, China",
                "subtitle": "College Students' Innovation and Entrepreneurship Competition",
                "content": "National Project",
                "period": ""
            }
        ],
        "Publications": [
            {
                "title": "",
                "subtitle": "",
                "content": "Xu, K., Hu, W., & Zhou, Z. (2024). The impact of reward distribution policies on user engagement and service consumption: A natural experiment at a cloud computing service provider. China Association for Information Systems Annual Meeting (CNAIS) 2024.",
                "period": ""
            },
            {
                "title": "",
                "subtitle": "",
                "content": "Xu, K., Nie, J., Chen, Y., Ban, Z., Liu, D., & Yin, R. (2024). Predicting intensive care unit length of stay for inflammatory bowel diseases patients using machine learning. In F. Tosi et al. (Eds.), Springer Series in Design and Innovation.",
                "period": ""
            },
            {
                "title": "",
                "subtitle": "",
                "content": "Xu, K., Chen, Y., & Nie, J. (2023). Subclass classification of ancient glassware based on K-Means and GMM. Highlights in Science, Engineering and Technology, 42, 277-284.",
                "period": ""
            },
        ]
    }


    return <>
        <div className="flex flex-col w-full mt-8">
            <PersonalInfoCardHeader />

            {["Education", "Work Experience", "Projects", "Publications"].map((section, index) => (
                <div key={index} className='mt-4'>
                    <h2 className="mt-8 text-2xl font-semibold">{section}</h2>
                    {cvJSONData[section].map((item, idx) => (<CVItem key={idx} {...item} />))}
                </div>
            ))}

        </div>
    </>
}