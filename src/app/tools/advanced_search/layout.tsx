import Menubar from "@/components/features/tools/advanced-search/Menubar";
export const metadata = {
  title: "Advanced Search",
  description: "Advanced Search for journal articles",
};

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Add the width constraint wrapper div here
    <div className="w-full py-8 px-4">
      <div className="flex flex-col space-y-8">
        <Menubar />
        {children}
      </div>
    </div>
  );
}
