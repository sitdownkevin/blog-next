import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"

function Values({ values }) {

    return (
        <div className="flex flex-col items-center w-full space-y-8">
            <h1 className="font-sans">Here are some of the values that I believe in</h1>
            <Accordion type="single" collapsible className="w-full">
                {values.map((value, index) => <AccordionItem key={index} value={value.title}>
                    <AccordionTrigger>{value.title}</AccordionTrigger>
                    <AccordionContent>
                        {value.description}
                    </AccordionContent>
                </AccordionItem>)}
            </Accordion>
        </div>
    )
}


export default function Page() {
    const values = [
        {
            title: "Diversity",
            description: "I champion diversity in all its forms - cultural, biological, genetic, and ethnic - as fundamental to societal progress. Diverse elements create dynamic interactions that spark innovation and drive cosmic evolution. This constant recombination aligns with my appreciation for entropy's creative power, where complexity emerges from varied components mixing and evolving.",
        },
        {
            title: "Decentralization",
            description: "I foresee an inevitable shift toward decentralization across power structures, wealth distribution, and social hierarchies. Historical patterns reveal that systemic evolution naturally progresses toward equitable resource allocation. Rather than finite competition for existing resources, I believe in creating systems that organically balance access while expanding collective prosperity.",
        },
        {
            title: "Copyright",
            description: "Modern copyright frameworks often stifle creativity they purport to protect, serving corporate monopolies more than actual creators. I celebrate the internet's disruptive democratization of knowledge-sharing. While respecting ethical creation, I recognize how information liberation movements have accelerated global equality and cross-cultural innovation in ways restrictive IP regimes never could."
        },
        {
            title: "Secular Humanism",
            description: "As a rationalist, I embrace empirical inquiry over divine dogma. The concept of a supreme deity strikes me as both anthropocentric and philosophically unnecessary – human progress emerges from collective reason, not celestial intervention. While respecting spiritual diversity, I advocate for secular ethics rooted in mutual responsibility: our survival depends not on salvation myths, but on cultivating critical thinking and evidence-based cooperation.",
        },
        {
            title: "Essentialist Philosophy",
            description: "I adhere to the principle of parsimony across design, thought, and systems. Apple's fusion of radical simplicity with profound utility demonstrates how eliminating non-essentials amplifies functionality and beauty. The Occam's Razor mindset guides my approach: complexity often masks inefficiency, while enduring solutions emerge from stripping problems to their core. This isn't minimalism for aesthetics, but cognitive triage - prioritizing fundamental truths over superficial layers. From user interfaces to social structures, I seek architectures where every element justifies its existence through measurable value creation.",
        }
    ]


    return (

        <Values values={values} />
    )
}