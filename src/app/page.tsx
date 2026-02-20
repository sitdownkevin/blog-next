import { Metadata } from "next";
import { PersonalIntroduction } from "./_components/personal-intro";
import { LanguageToggle } from "./_components/language-toggle";

export const metadata: Metadata = {
  title: "Ke Xu's website",
  description:
    "Hi, I'm Ke Xu, a Ph.D. candidate in Information Systems at Tongji University, Shanghai, China.",
  keywords: ["Ke Xu", "personal website", "blog", "portfolio"],
  authors: [{ name: "Ke Xu" }],
  creator: "Ke Xu",
  openGraph: {
    title: "Ke Xu's website",
    description:
      "Hi, I'm Ke Xu, a Ph.D. candidate in Information Systems at Tongji University, Shanghai, China.",
    url: "https://kexu.win",
    siteName: "Ke Xu's website",
    images: [
      {
        url: "/og-image.jpg",
        width: 940,
        height: 940,
        alt: "Hi, I'm Ke Xu, a Ph.D. candidate in Information Systems at Tongji University, Shanghai, China.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ke Xu's website",
    description:
      "Hi, I'm Ke Xu, a Ph.D. candidate in Information Systems at Tongji University, Shanghai, China.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://kexu.win",
  },
};

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ language?: string }>;
}) {
  const params = await searchParams;
  const language = params?.language || "en";
  const lang = language === "zh" ? "zh" : "en";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ke Xu",
    url: "https://kexu.win",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <div className="w-full mx-auto relative">
        <LanguageToggle currentLang={lang} />
        <PersonalIntroduction lang={lang} />
      </div>
    </>
  );
}
