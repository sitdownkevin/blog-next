"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const components: { title: string; href: string; description: string; alias: string }[] = [
    {
        title: "UTD24",
        href: "/tools/advanced_search/utd",
        description: "UTD24",
        alias: "utd",
    },
    {
        title: "FT50",
        href: "/tools/advanced_search/ft",
        description: "FT50",
        alias: "ft",
    },
    {
        title: "AIS Bucket",
        href: "/tools/advanced_search/ais",
        description: "AIS Bucket",
        alias: "ais",
    },
    {
        title: "TJSEM I",
        href: "/tools/advanced_search/tjsem_i",
        description: "TJSEM Table I",
        alias: "tjsem_i",
    },
    {
        title: "TJSEM II",
        href: "/tools/advanced_search/tjsem_ii",
        description: "TJSEM Table II",
        alias: "tjsem_ii",
    },
    {
        title: "USTC SOM",
        href: "/tools/advanced_search/ustc_som",
        description: "USTC SOM",
        alias: "ustc_som",
    }
];

export default function Menubar() {
    const pathname = usePathname();
    const currentAlias = pathname.split("/").pop();

  return (
    <div className="flex flex-row gap-2 sm:gap-4 justify-center">
        {components.map((component) => (
            <Link href={component.href} key={component.href} className={`text-xs ${currentAlias === component.alias ? "text-blue-500" : "text-gray-500"}`}>
                {component.title}
            </Link>
        ))}
    </div>
  );
}
