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
  return <PersonalIntroduction lang={lang} latestPosts={latestPosts} />;
}
