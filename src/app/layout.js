import { Inter } from "next/font/google";
import "./globals.css";
import 'katex/dist/katex.min.css';

import Link from "next/link";

import { icons } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });
import { Toaster } from '@/components/ui/sonner'

export const metadata = {
  title: "k's Space",
  description: "",
  icons: {
    icon: '/favicon.ico',
  }
};


function Header() {
  return <header className="bg-gray-0 py-4 px-6 mb-3 flex items-center justify-between">
    <div className="logo">
      <h1 className="text-xl font-bold text-gray-800"></h1>
    </div>
    <nav className="flex space-x-4 font-mono text-gray-600">
      <Link href="/" className="hover:text-blue-500 transition-colors duration-200 text-sm md:text-base">
        CV
      </Link>
      <Link href="/posts" className="hover:text-blue-500 transition-colors duration-200 text-sm md:text-base">
        Posts
      </Link>
      <Link href="/quickrefs" className=" hover:text-blue-500 transition-colors duration-200 text-sm md:text-base">
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
