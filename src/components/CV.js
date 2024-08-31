import Image from 'next/image'

function CVItem({ title, subtitle, content, period }) {
    return <p>
        {title ? <span className={"font-bold"}>{title}</span> : null}
        {subtitle ? <>{title ? <br /> : null}<span className={"italic text-gray-600"}>{subtitle}</span></> : null}
        {content ? <>{title || subtitle ? <br /> : null}<span className={"text-gray-600"}>{content}</span></> : null}
        {period ? <>{title || subtitle || content ? <br /> : null}<span className={"text-gray-600 text-sm"}>{period}</span></> : null}
    </p>
}


function PersonalInfo() {
    return (
        <div className="sticky top-0 bg-white z-10 py-4 flex animate-slide-down justify-between items-start backdrop-blur-md bg-opacity-90">
            <div className="w-5/6">
                <h1 className="text-4xl font-mono">Ke Xu</h1>
                <div className="mt-2 text-xs">
                    <div className="border-0 border-green-500 text-gray-500">
                        kexu567@gmail.com
                    </div>
                    <div className="border-0 border-green-500 text-gray-500">
                        Shanghai, China
                    </div>
                </div>
                <div className="border-0 border-green-500 mt-2 text-xs text-gray-600">
                    Information Systems, Data Mining, Web3, and Blockchain Technology.
                </div>
            </div>

            <Image
                src="/kexu_photo.jpg"
                alt="kexu_photo"
                width={2125} // md尺寸下的宽度
                height={3217} // md尺寸下的高度
                className="w-20 md:w-24 object-cover mr-4"
            />
        </div>
    )
}


export function CV() {
    var cvJSONData = { "Education": [{ "title": "Tongji University, Shanghai", "subtitle": "Master's Degree in Management Science and Engineering", "content": "", "period": "September 2024 - Present" }, { "title": "Sichuan University, Chengdu", "subtitle": "Bachelor's Degree in Industrial Engineering", "content": "", "period": "September 2020 - June 2024" }], "Work Experience": [{ "title": "Airbus Beijing Engineering Centre (ABEC), Beijing", "subtitle": "Engineering Intern at ACO1I", "content": "Data Mining, Operation System (Kanban Development)", "period": "January 2024 - May 2024" }, { "title": "West China Biomedical Big Data Center, Chengdu", "subtitle": "Research Assistant", "content": "Active Learning, Contrastive Learning", "period": "October 2022 - April 2023" }], "Projects": [{ "title": "Design and Control Method of Modular Mechanical Prosthesis, China", "subtitle": "College Students' Innovation and Entrepreneurship Competition", "content": "National Project", "period": "" }], "Publications": [{ "title": "", "subtitle": "", "content": "Xu, K., Chen, Y., & Nie, J. (2023). Subclass classification of ancient glassware based on K-Means and GMM. Highlights in Science, Engineering and Technology, 42, 277-284. https://doi.org/10.54097/hset.v42i.7106", "period": "" }] }

    return <>
        <div className="flex flex-col w-full mt-8">

            <PersonalInfo />

            {["Education", "Work Experience", "Projects", "Publications"].map((section, index) => (
                <>
                    <h2 className="mt-8 text-2xl font-semibold">{section}</h2>
                    {cvJSONData[section].map((item, idx) => (<CVItem key={idx} {...item} />))}
                </>
            ))}

        </div>
    </>
}