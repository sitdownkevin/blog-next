import {
  PersonalIntroduction,
  type LatestPost,
} from "./personal-intro";

export function HomeContent({
  lang,
  latestPosts,
}: {
  lang: "en" | "zh";
  latestPosts: LatestPost[];
}) {
  return (
    <div className="w-full mx-auto relative">
      <PersonalIntroduction lang={lang} latestPosts={latestPosts} />
    </div>
  );
}
