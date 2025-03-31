import { FaGithub, FaLinkedin, FaInstagram, FaWeibo, FaRss } from "react-icons/fa";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
    return (
        <div className="w-full md:w-5/6 lg:w-4/6 print:hidden">
            <header className="bg-gray-0 py-4 px-6 mb-3 flex items-center justify-between">
                <div className="logo">
                    <h1 className="text-xl font-bold text-gray-500"></h1>
                    <div className="flex flex-row items-center space-x-4 w-full">
                        <a
                            href="https://github.com/sitdownkevin"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 hover:text-gray-500 transition-colors duration-300 hover:scale-105"
                        >
                            <FaGithub className="dark:text-white" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/sitdownkevin"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 hover:text-gray-500 transition-colors duration-300 hover:scale-105"
                        >
                            <FaLinkedin className="dark:text-white" />
                        </a>
                        <a
                            href="https://www.instagram.com/sitdownkevin/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 hover:text-gray-500 transition-colors duration-300 hover:scale-105"
                        >
                            <FaInstagram className="dark:text-white" />
                        </a>
                        <a
                            href="https://weibo.com/u/5668436889"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 hover:text-gray-500 transition-colors duration-300 hover:scale-105"
                        >
                            <FaWeibo className="dark:text-white" />
                        </a>
                        <a
                            href="/api/rss"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 hover:text-gray-500 transition-colors duration-300 hover:scale-105"
                        >
                            <FaRss className="dark:text-white" />
                        </a>
                        <ThemeToggle />
                    </div>
                </div>
                <nav className="flex space-x-4 font-sans text-gray-500">
                    <Link
                        href="/posts"
                        className="dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-300 text-xs hover:scale-105"
                    >
                        Posts
                    </Link>
                </nav>
            </header>
        </div>
    );
}