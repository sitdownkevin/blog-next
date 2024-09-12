import { Inter } from "next/font/google";
import "./globals.css";
import "./github-markdown.css";
import 'katex/dist/katex.min.css';

import Link from "next/link";
import { FaGithub, FaLinkedin, FaInstagram, FaWeibo } from 'react-icons/fa'

const inter = Inter({ subsets: ["latin"] });
import { Toaster } from '@/components/ui/sonner'

export const metadata = {
  title: "Ke Xu",
  description: "Ke Xu's personal website",
  icons: {
    icon: '/favicon.ico',
  }
};


function Header() {
  return <header className="bg-gray-0 py-4 px-6 mb-3 flex items-center justify-between">
    <div className="logo">
      <h1 className="text-xl font-bold text-gray-500"></h1>
      <div className="flex flex-row items-center space-x-4 w-full">
          <a href="https://github.com/sitdownkevin" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-500 transition-colors duration-300 hover:scale-105"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/sitdownkevin" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-500 transition-colors duration-300 hover:scale-105"><FaLinkedin /></a>
          <a href="https://www.instagram.com/sitdownkevin/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-500 transition-colors duration-300 hover:scale-105"><FaInstagram /></a>
          <a href="https://weibo.com/u/5668436889" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-500 transition-colors duration-300 hover:scale-105"><FaWeibo /></a>
      </div>
    </div>
    <nav className="flex space-x-4 font-sans text-gray-500">
      <Link href="/" className="hover:text-blue-500 transition-colors duration-200 text-xs md:text-sm">
        CV
      </Link>
      <Link href="/posts" className="hover:text-blue-500 transition-colors duration-200 text-xs md:text-sm">
        Posts
      </Link>
      <Link href="/quickrefs" className=" hover:text-blue-500 transition-colors duration-200 text-xs md:text-sm">
        QRefs
      </Link>
    </nav>
  </header>
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-w-[320px] flex flex-col items-center justify-center w-full h-full">
          <div className="w-full md:w-5/6 lg:w-4/6">
            <Header />
          </div>
          <div className="w-5/6 md:w-4/6 lg:w-3/6 mb-16">
            {children}
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
