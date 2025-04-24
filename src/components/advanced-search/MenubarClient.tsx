"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenubarItem } from "@/lib/types"; // Import MenubarItem from shared types
import { Button } from "@/components/ui/button"; // Import shadcn Button component

type MenubarClientProps = {
    components: MenubarItem[];
}

export default function MenubarClient({ components }: MenubarClientProps) {
    const pathname = usePathname();
    const currentAlias = pathname.split("/").pop();
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const handleMouseEnter = (title: string) => {
        setActiveDropdown(title);
    };

    const handleMouseLeave = () => {
        setActiveDropdown(null);
    };

    const renderMenuItem = (component: MenubarItem) => {
        const isActive = currentAlias === component.alias;

        if (component.subItems) {
            return (
                <div
                    key={component.title}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(component.title)}
                    onMouseLeave={handleMouseLeave}
                >
                    <Button
                        variant="ghost" // Use ghost variant for a similar look
                        size="sm" // Use small size
                        className={`px-3 py-2 text-xs rounded-md transition-colors
                            ${isActive
                                ? "text-primary" // Active text color
                                : "text-foreground hover:text-foreground"} // Inactive and hover text color
                            ${isActive ? "bg-accent" : "hover:bg-accent"} // Active and hover background color
                        `}
                    >
                        {component.title}
                    </Button>

                    {activeDropdown === component.title && (
                        <div className="absolute top-full left-0 bg-popover rounded-md min-w-[150px] z-10 shadow-md dark:shadow-gray-800"> {/* Use popover background */}
                            {component.subItems.map((subItem) => (
                                <Link
                                    key={subItem.href}
                                    href={subItem.href || "#"}
                                    className={`block px-4 py-2 text-xs transition-colors
                                        ${currentAlias === subItem.alias
                                            ? "text-primary bg-accent" // Active text and background
                                            : "text-foreground hover:text-foreground hover:bg-accent" // Inactive and hover text and background
                                        }`}
                                >
                                    {subItem.title}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        return (
            <Link
                key={component.href}
                href={component.href || "#"}
                className={`px-3 text-xs py-2 rounded-md transition-colors
                    ${isActive
                        ? "text-primary bg-accent" // Active text and background
                        : "text-foreground hover:text-foreground hover:bg-accent" // Inactive and hover text and background
                    }`}
            >
                {component.title}
            </Link>
        );
    };

    return (
        <nav className="flex flex-row items-center gap-1 sm:gap-2 justify-center bg-background"> {/* Use background color */}
            {components.map(renderMenuItem)}
        </nav>
    );
}