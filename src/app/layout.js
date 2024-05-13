import { Inter } from "next/font/google";
import "./globals.css";
import 'katex/dist/katex.min.css';
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <div className="min-w-[320px] flex flex-col items-center justify-center w-full h-full">
            <div className="w-5/6 md:w-4/6 lg:w-3/6 mb-16">
                {children}
            </div>
          </div>
          <Toaster />
      </body>
    </html>
  );
}
