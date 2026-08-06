import {
  PersonalIntroduction,
  type LatestPost,
} from "./personal-intro";
import type { PersonalIntroDocument } from "@/lib/personal-intro/types";

export function HomeContent({
  lang,
  latestPosts,
  personalIntro,
}: {
  lang: "en" | "zh";
  latestPosts: LatestPost[];
  personalIntro: PersonalIntroDocument;
}) {
  return (
    <PersonalIntroduction
      lang={lang}
      latestPosts={latestPosts}
      data={personalIntro}
    />
  );
}
