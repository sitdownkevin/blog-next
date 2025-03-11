import ManuBar from "@/components/advanced-search/Menubar";
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
    <div className="flex flex-col space-y-8">
      <ManuBar />
      {children}
    </div>
  );
}
