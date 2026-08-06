"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "About", match: (path: string) => path === "/" },
  {
    href: "/posts",
    label: "Posts",
    match: (path: string) => path.startsWith("/posts"),
  },
];

export function NavLinks() {
  const pathname = usePathname() || "/";

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
