import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  if (external || href.startsWith("http")) {
    return (
      <a
        href={href}
        className="text-muted-foreground text-xxs hover:text-claude-orange transition-colors duration-300"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="text-muted-foreground text-xxs hover:text-claude-orange transition-colors duration-300"
    >
      {children}
    </Link>
  );
}

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="w-full py-8 px-4 flex flex-row justify-center gap-10 sm:gap-16 md:gap-20 border-t border-border">
      <div className="flex flex-col gap-1.5">
        <span className="text-xxs font-semibold tracking-wide text-foreground/80">
          {t("about")}
        </span>
        <FooterLink href="/about/resume">{t("resume")}</FooterLink>
        <FooterLink href="/about/gallery">{t("gallery")}</FooterLink>
        <FooterLink href="/about/get_my_wx">{t("wechat")}</FooterLink>
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="text-xxs font-semibold tracking-wide text-foreground/80">
          {t("tools")}
        </span>
        <FooterLink href="/tools/advanced_search">
          {t("advancedSearch")}
        </FooterLink>
        <FooterLink href="/tools/gpt_4o_image_prompts">
          {t("gpt4oPrompts")}
        </FooterLink>
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="text-xxs font-semibold tracking-wide text-foreground/80">
          {t("projects")}
        </span>
        <FooterLink href="https://github.com/sitdownkevin/Blackboard-Enhanced">
          BB Enhanced
        </FooterLink>
        <FooterLink
          href="https://sitdownkevin.github.io/dorm-wifi-tauri/"
          external
        >
          DORM WIFI
        </FooterLink>
        <FooterLink
          href="https://github.com/sitdownkevin/Simple-Robotic-Hand-Control"
          external
        >
          S-R-H-C
        </FooterLink>
      </div>
    </footer>
  );
}
