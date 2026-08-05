import { PersonalIntroduction } from "./personal-intro";
import { LanguageToggle } from "./language-toggle";

export function HomeContent({ lang }: { lang: "en" | "zh" }) {
  return (
    <div className="w-full mx-auto relative">
      <LanguageToggle currentLang={lang} />
      <PersonalIntroduction lang={lang} />
    </div>
  );
}
