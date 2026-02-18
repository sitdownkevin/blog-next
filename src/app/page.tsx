import { Metadata } from "next";
import { PersonalIntroduction } from "./_components/personal-intro";

export const metadata: Metadata = {
  title: "kexu's website",
  description: "Personal website of Ke Xu",
  keywords: ["Ke Xu", "personal website", "blog", "portfolio"],
  authors: [{ name: "Ke Xu" }],
  creator: "Ke Xu",
  openGraph: {
    title: "kexu's website",
    description: "Personal website of Ke Xu",
    url: "https://kexu.win",
    siteName: "kexu's website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ke Xu's personal website",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "kexu's website",
    description: "Personal website of Ke Xu",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://kexu.win",
  },
};

export default function Page() {
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
      <div className="w-full mx-auto">
        <PersonalIntroduction />
      </div>
    </>
  );
}
