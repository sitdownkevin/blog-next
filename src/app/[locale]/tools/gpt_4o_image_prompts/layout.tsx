import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "GPT-4o Image Prompts",
  description:
    "A curated gallery of GPT-4o image prompts and example generations.",
  alternates: {
    canonical: absoluteUrl("/tools/gpt_4o_image_prompts"),
  },
};

export default function Gpt4oImagePromptsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
