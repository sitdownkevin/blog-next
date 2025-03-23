import { Metadata } from "next";
import { Inter } from "next/font/google";
import "@fontsource/maple-mono";
import "./globals.css";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import ThemeProvider from "@/components/global/ThemeProvider";

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
          url: "/api/rss",
          title: "Ke Xu's Blog RSS Feed",
        },
      ],
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-w-[320px] flex flex-col items-center justify-center w-full">
            <Header />
            <div className="w-5/6 md:w-2/3 lg:w-1/2 mb-16">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
