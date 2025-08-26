import { MenubarItem } from "@/lib/types";

export const menubarComponents: MenubarItem[] = [
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
        title: "AIS Basket",
        item: false,
        href: "/tools/advanced_search/ais",
        description: "AIS Basket",
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