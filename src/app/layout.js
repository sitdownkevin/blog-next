import { Inter } from "next/font/google";
import "./globals.css";
import 'katex/dist/katex.min.css';
import { icons } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

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
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="w-2/3 mb-16">
                {children}
            </div>
          </div>
      </body>
    </html>
  );
}
