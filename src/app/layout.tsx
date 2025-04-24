import { Metadata } from "next";
import { Inter } from "next/font/google";
import "@fontsource/maple-mono";
import "./globals.css";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import ThemeProvider from "@/components/global/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "k's Space",
  description: "Personal website of Ke Xu",
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    types: {
      "application/rss+xml": [
        {
          url: "/api/rss",
          title: "Blog RSS Feed of kexu.win",
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
        <ThemeProvider>
          <div className="min-w-[320px] flex flex-col items-center justify-center w-full">
            <Header />
            {/* Add padding-top equal to header height to prevent overlap */}
            <div className="w-5/6 md:w-2/3 lg:w-1/2 mb-16 pt-[70px]">{children}</div> {/* Adjust pt-[70px] based on actual header height */}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
