import { Suspense } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaWeibo,
  FaRss,
} from "react-icons/fa";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";
import { NavLinks } from "./nav-links";

export function Header() {
  const socialLinks = [
    {
      icon: FaGithub,
      href: "https://github.com/sitdownkevin",
      label: "Github",
    },
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/sitdownkevin",
      label: "Linkedin",
    },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/sitdownkevin",
      label: "Instagram",
      hideOnMobile: true,
    },
    {
      icon: FaWeibo,
      href: "https://weibo.com/u/5668436889",
      label: "Weibo",
      hideOnMobile: true,
    },
    {
      icon: FaRss,
      href: "/api/rss",
      label: "RSS",
    },
  ];

  return (
    <header className="py-4 px-4 flex items-center justify-between border-b border-border gap-3 sm:gap-4">
      <div className="flex flex-row items-center gap-3 sm:gap-4 min-w-0">
        {socialLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-foreground/70 hover:text-claude-orange transition-colors duration-300${
              link.hideOnMobile ? " hidden sm:inline-flex" : ""
            }`}
            aria-label={link.label}
          >
            <link.icon />
          </Link>
        ))}

        <ThemeToggle />
        <Suspense fallback={null}>
          <LanguageToggle />
        </Suspense>
      </div>

      <NavLinks />
    </header>
  );
}
