"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function NavLinks() {
  const t = useTranslations("Nav");
  const pathname = usePathname() || "/";

  const links = [
    { href: "/", label: t("about"), match: (path: string) => path === "/" },
    {
      href: "/posts",
      label: t("posts"),
      match: (path: string) => path.startsWith("/posts"),
    },
  ] as const;

  return (
    <nav className="flex shrink-0 space-x-4 font-sans text-muted-foreground tracking-wide">
      {links.map((link) => {
        const active = link.match(pathname);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "text-xs font-medium transition-colors duration-300",
              active
                ? "text-claude-orange"
                : "hover:text-claude-orange",
            )}
            aria-current={active ? "page" : undefined}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
