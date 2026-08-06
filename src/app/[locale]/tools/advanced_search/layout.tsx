import type { Metadata } from "next";
import Menubar from "@/components/features/tools/advanced-search/Menubar";
import { absoluteUrl } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Advanced Search",
  description: "Advanced Search for journal articles",
  alternates: {
    canonical: absoluteUrl("/tools/advanced_search"),
  },
};

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full py-8 px-4">
      <div className="flex flex-col space-y-8">
        <Menubar />
        {children}
      </div>
    </div>
  );
}
