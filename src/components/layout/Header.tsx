import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaWeibo,
  FaRss,
} from "react-icons/fa";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {

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
    <div
      className={`w-5/6 md:w-2/3 lg:w-1/2`}
    >
      <header
        className={`bg-gray-0 py-4 px-2 flex items-center justify-between 
            border-b-1 border-gray-300
            `}
      >
        <div className="flex flex-row items-center space-x-4 w-full">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-gray-500 transition-colors duration-300 hover:scale-105"
            >
              <link.icon className="dark:text-white" />
            </Link>
          ))}

          <ThemeToggle />
        </div>

        <div className="flex space-x-4 font-sans text-gray-500">
          <Link
            href="/posts"
            className="dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-300 text-xs hover:scale-105"
          >
            Posts
          </Link>
        </div>
      </header>
    </div>
  );
}
