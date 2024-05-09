import { Inter } from "next/font/google";
import "./globals.css";
import 'katex/dist/katex.min.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "k's Space",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
