"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MenubarItem = {
    title: string;
    item: boolean;
    href?: string;
    description?: string;
    alias?: string;
    subItems?: MenubarItem[];
}

const components: MenubarItem[] = [
    {
        title: "UTD24",
        item: true,
        href: "/tools/advanced_search/utd",
        description: "UTD24",
        alias: "utd",
    },
    {
        title: "FT50",
        item: true,
        href: "/tools/advanced_search/ft",
        description: "FT50",
        alias: "ft",
    },
    {
        title: "AIS Bucket",
        item: false,
        href: "/tools/advanced_search/ais",
        description: "AIS Bucket",
        alias: "ais",
    },
    {
        title: "TJSEM",
        item: false,
        subItems: [
            {
                title: "TJSEM I",
                item: true,
                href: "/tools/advanced_search/tjsem_i",
                description: "TJSEM Table I",
                alias: "tjsem_i",
            },
            {
                title: "TJSEM II",
                item: true,
                href: "/tools/advanced_search/tjsem_ii",
                description: "TJSEM Table II",
                alias: "tjsem_ii",
            },
        ]
    },
    {
        title: "USTCSOM",
        item: false,
        subItems: [
            {
                title: "2A1",
                item: true,
                href: "/tools/advanced_search/ustc_som_2a1",
                description: "USTC SOM",
                alias: "ustc_som_2a1",
            },
            {
                title: "A1",
                item: true,
                href: "/tools/advanced_search/ustc_som_a1",
                description: "USTC SOM",
                alias: "ustc_som_a1",
            },
            {
                title: "A2",
                item: true,
                href: "/tools/advanced_search/ustc_som_a2",
                description: "USTC SOM",
                alias: "ustc_som_a2",
            },
            {
                title: "A3",
                item: true,
                href: "/tools/advanced_search/ustc_som_a3",
                description: "USTC SOM",
                alias: "ustc_som_a3",
            },
            {
                title: "B1",
                item: true,
                href: "/tools/advanced_search/ustc_som_b1",
                description: "USTC SOM",
                alias: "ustc_som_b1",
            },
            {
                title: "B2",
                item: true,
                href: "/tools/advanced_search/ustc_som_b2",
                description: "USTC SOM",
                alias: "ustc_som_b2",
            },
            {
                title: "C1",
                item: true,
                href: "/tools/advanced_search/ustc_som_c1",
                description: "USTC SOM",
                alias: "ustc_som_c1",
            },
        ]
    }
];


export default function Menubar() {
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
                    <button
                        className={`px-3 py-2 text-xs rounded-md transition-colors
                            ${isActive ? "text-blue-500" : "text-gray-500 hover:text-gray-700"}
                        `}
                    >
                        {component.title}
                    </button>
                    
                    {activeDropdown === component.title && (
                        <div className="absolute top-full left-0 bg-white rounded-md min-w-[150px] z-10">
                            {component.subItems.map((subItem) => (
                                <Link
                                    key={subItem.href}
                                    href={subItem.href || "#"}
                                    className={`block px-4 py-2 text-xs transition-colors
                                        ${currentAlias === subItem.alias 
                                            ? "text-blue-500 bg-blue-50" 
                                            : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
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
                        ? "text-blue-500 bg-blue-50" 
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    }`}
            >
                {component.title}
            </Link>
        );
    };

    return (
        <nav className="flex flex-row items-center gap-1 sm:gap-2 justify-center bg-white rounded-lg">
            {components.map(renderMenuItem)}
        </nav>
    );
}
