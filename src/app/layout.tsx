import { Metadata } from "next";
import { Inter } from "next/font/google";
import "@fontsource/maple-mono";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaWeibo,
  FaRss,
} from "react-icons/fa";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ke Xu",
  description: "Ke Xu's personal website",
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    types: {
      "application/rss+xml": [
        {
          url: "/rss.xml",
          title: "Ke Xu's Blog RSS Feed",
        },
      ],
    },
  },
};

function Header() {
  return (
    <>
      <div className="w-full md:w-5/6 lg:w-4/6">
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
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/sitdownkevin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-500 transition-colors duration-300 hover:scale-105"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://www.instagram.com/sitdownkevin/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-500 transition-colors duration-300 hover:scale-105"
              >
                <FaInstagram />
              </a>
              <a
                href="https://weibo.com/u/5668436889"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-500 transition-colors duration-300 hover:scale-105"
              >
                <FaWeibo />
              </a>
              <a
                href="/api/rss"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-500 transition-colors duration-300 hover:scale-105"
              >
                <FaRss />
              </a>
            </div>
          </div>
          <nav className="flex space-x-4 font-sans text-gray-500">
            <Link
              href="/posts"
              className="hover:text-blue-500 transition-colors duration-300 text-xs hover:scale-105"
            >
              Posts
            </Link>
          </nav>
        </header>
      </div>
    </>
  );
}

function Footer() {
  return (
    <>
      <div className="w-5/6 md:w-2/3 lg:w-1/2 flex flex-col space-y-8 mb-16">
        <div className="flex flex-row justify-center items-center space-x-4">
          <Image
            src={"/favicon-32x32.png"}
            width={16}
            height={16}
            alt=""
            className="rotate-slowly"
          />
        </div>

        <div className="flex flex-row justify-center space-x-8 md:space-x-16">
          <div className="flex flex-col">
            <span className="text-xxs">About</span>
            <span className="text-gray-500 text-xxs">
              <Link href={"/"}>CV</Link>
            </span>
            <span className="text-gray-500 text-xxs">
              <Link href={"/me/value"}>Values</Link>
            </span>
            <span className="text-gray-500 text-xxs">
              <Link href={"/me/gallery"}>Gallery</Link>
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xxs">Tools</span>
            <span className="text-gray-500 text-xxs">
              <Link href={"/tools/advanced_search"}>Advanced Search</Link>
            </span>
            <span className="text-gray-500 text-xxs">
              <Link href={"/quickrefs"}>Quick References</Link>
            </span>
            <span className="text-gray-500 text-xxs">
              <Link href={"/pow"}>PoW</Link>
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xxs">Projects</span>
            <span className="text-gray-500 text-xxs">
              <Link href={"/posts/blackboard-enhanced"}>BB Enhanced</Link>
            </span>
            <span className="text-gray-500 text-xxs">
              <Link
                href={"https://sitdownkevin.github.io/dorm-wifi-tauri/"}
                target="_blank"
                rel="noopener noreferrer"
              >
                DORM WIFI
              </Link>
            </span>
            <span className="text-gray-500 text-xxs">
              <Link
                href={
                  "https://github.com/sitdownkevin/Simple-Robotic-Hand-Control"
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                S-R-H-C
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-w-[320px] flex flex-col items-center justify-center w-full">
          <Header />
          <div className="w-5/6 md:w-2/3 lg:w-1/2 mb-16">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
