"use client";

import {
  FaGithub,
  FaLinkedin,
  FaRss,
  FaWeixin,
} from "react-icons/fa";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import ThemeToggle from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";
import { NavLinks } from "./nav-links";

const ICON_SIZE = 16;

export function Header() {
  const t = useTranslations("Header");
  const pathname = usePathname() || "/";
  const wechatActive = pathname.startsWith("/about/get_my_wx");

  const socialLinks = [
    {
      icon: FaGithub,
      href: "https://github.com/sitdownkevin",
      label: "Github",
      external: true,
    },
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/sitdownkevin",
      label: "Linkedin",
      external: true,
    },
    {
      icon: FaRss,
      href: "/api/rss",
      label: "RSS",
      external: true,
    },
    {
      icon: FaWeixin,
      href: "/about/get_my_wx",
      label: t("wechat"),
      external: false,
      // FaWeixin viewBox 更宽（576×512），同像素下字形偏小，略放大对齐
      size: 19,
    },
  ] as const;

  const iconClass =
    "inline-flex shrink-0 items-center justify-center text-foreground/70 hover:text-claude-orange transition-colors duration-300";

  return (
    <header className="py-4 px-4 flex items-center justify-between border-b border-border gap-3 sm:gap-4">
      <div className="flex flex-row items-center gap-3 sm:gap-4 min-w-0">
        {socialLinks.map((link) => {
          const size = "size" in link ? link.size : ICON_SIZE;
          const icon = <link.icon size={size} aria-hidden />;

          if (link.external) {
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={iconClass}
                aria-label={link.label}
              >
                {icon}
              </a>
            );
          }

          return (
            <Link
              key={link.label}
              href={link.href}
              className={iconClass}
              aria-label={link.label}
              aria-current={wechatActive ? "page" : undefined}
            >
              {icon}
            </Link>
          );
        })}

        <ThemeToggle />
        <LanguageToggle />
      </div>

      <NavLinks />
    </header>
  );
}
