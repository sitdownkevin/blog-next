import { ThemeProvider as WrkszThemeProvider } from "@wrksz/themes/next";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WrkszThemeProvider attribute="class" defaultTheme="light">
      {children}
    </WrkszThemeProvider>
  );
}
