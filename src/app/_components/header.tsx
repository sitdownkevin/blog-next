import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaWeibo,
  FaRss,
} from "react-icons/fa";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";

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
    },
    {
      icon: FaWeibo,
      href: "https://weibo.com/u/5668436889",
      label: "Weibo",
    },
    {
      icon: FaRss,
      href: "/api/rss",
      label: "RSS",
    },
  ];

  return (
    <header className="py-4 px-4 flex items-center justify-between border-b border-border">
      <div className="flex flex-row items-center space-x-4 w-full">
        {socialLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/70 hover:text-claude-orange transition-colors duration-300"
          >
            <link.icon />
          </Link>
        ))}

        <ThemeToggle />
      </div>

      <div className="flex space-x-4 font-sans text-muted-foreground tracking-wide">
        <Link
          href="/"
          className="hover:text-claude-orange transition-colors duration-300 text-xs font-medium"
        >
          About
        </Link>
        <Link
          href="/posts"
          className="hover:text-claude-orange transition-colors duration-300 text-xs font-medium"
        >
          Posts
        </Link>
      </div>
    </header>
  );
}
