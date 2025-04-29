import Menubar from "@/components/advanced-search/Menubar";
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
    <div className="w-5/6 md:w-2/3 lg:w-1/2 mx-auto">
      <div className="flex flex-col space-y-8">
        <Menubar />
        {children}
      </div>
    </div>
  );
}
