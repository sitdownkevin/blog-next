import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get my WeChat",
  description: "Solve a proof-of-work challenge to reveal a WeChat QR code.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function GetMyWxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
