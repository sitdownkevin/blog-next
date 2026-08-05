import { Metadata } from "next";
import { getMatterList } from "@/lib/posts/getMatterList";
import { PostsList } from "./_components/posts-list";

export const metadata: Metadata = {
  title: "Posts - Ke Xu's website",
  description: "Blog posts and notes by Ke Xu.",
  alternates: {
    canonical: "https://kexu.win/posts",
  },
};

export default async function Page() {
  const matterList = (await getMatterList())
    .filter((matter) => !matter.hidden)
    .map((matter) => ({
      ...matter,
      create_date: matter.create_date?.toISOString(),
      update_date: matter.update_date?.toISOString(),
    }));

  return <PostsList initialMatterList={matterList} />;
}
