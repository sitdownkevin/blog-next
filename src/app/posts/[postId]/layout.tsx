import "@/app/posts/[postId]/katex.css";
import "katex/dist/katex.min.css";
import "@/app/posts/[postId]/markdown.css";

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full mx-auto flex flex-col">{children}</div>;
}
