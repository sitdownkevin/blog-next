import { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import ThemeProvider from "@/components/layout/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "./_components/header";
import { Footer } from "./_components/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://kexu.win"),
  title: "kexu's website",
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
      <body className={inter.variable}>
        <ThemeProvider>
          <div className="min-w-[320px] flex flex-col items-center justify-center w-full">
            <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col">
              <Header />
              {children}
              <Footer />
            </div>
            <Toaster richColors /> {/* Add Toaster here */}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
