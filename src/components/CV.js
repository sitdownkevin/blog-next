import Image from 'next/image'

function CVItem({ title, subtitle, content, period }) {
    return <p>
        {title ? <span className={"font-bold"}>{title}</span> : null}
        {subtitle ? <>{title ? <br /> : null}<span className={"italic text-gray-600"}>{subtitle}</span></> : null}
        {content ? <>{title || subtitle ? <br /> : null}<span className={"text-gray-600"}>{content}</span></> : null}
        {period ? <>{title || subtitle || content ? <br /> : null}<span className={"text-gray-600 text-sm"}>{period}</span></> : null}
    </p>
}


export function CV() {
    var cvJSONData = { "Education": [{ "title": "Tongji University, Shanghai", "subtitle": "Master's Degree in Management Science and Engineering", "content": "", "period": "September 2024 - Present" }, { "title": "Sichuan University, Chengdu", "subtitle": "Bachelor's Degree in Industrial Engineering", "content": "", "period": "September 2020 - June 2024" }], "Work Experience": [{ "title": "Airbus Beijing Engineering Centre (ABEC), Beijing", "subtitle": "Engineering Intern at ACO1I", "content": "Data Mining, Operation System (Kanban Development)", "period": "January 2024 - May 2024" }, { "title": "West China Biomedical Big Data Center, Chengdu", "subtitle": "Research Assistant", "content": "Active Learning, Contrastive Learning", "period": "October 2022 - April 2023" }], "Projects": [{ "title": "Design and Control Method of Modular Mechanical Prosthesis, China", "subtitle": "College Students' Innovation and Entrepreneurship Competition", "content": "National Project", "period": "" }], "Publications": [{ "title": "", "subtitle": "", "content": "Xu, K., Chen, Y., & Nie, J. (2023). Subclass classification of ancient glassware based on K-Means and GMM. Highlights in Science, Engineering and Technology, 42, 277-284. https://doi.org/10.54097/hset.v42i.7106", "period": "" }] }


    return <>
        <div className="flex flex-col w-full mt-8">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-4xl font-bold">Ke Xu</h1>
                    <div className="mt-2 text-sm">
                        <div className="border-0 border-green-500 text-gray-500">
                            kexu567@gmail.com
                        </div>
                        <div className="border-0 border-green-500 text-gray-500">
                            Shanghai, China
                        </div>
                        <div className="border-0 border-green-500 mt-2 p-0">
                            Information System, Web3
                        </div>
                    </div>
                </div>
                <div className="relative w-24 md:w-32 h-32 md:h-44">
                    <Image
                        src="/kexu_photo.jpg"
                        alt="kexu_photo"
                        fill={true}
                        style={{ objectFit: 'cover' }}
                    />
                </div>
            </div>

            {["Education", "Work Experience", "Projects", "Publications"].map((section, index) => (
                <>
                    <h2 className="mt-8 text-2xl font-semibold">{section}</h2>
                    {cvJSONData[section].map((item, idx) => (<CVItem key={idx} {...item} />))}
                </>
            ))}

        </div>
    </>
}