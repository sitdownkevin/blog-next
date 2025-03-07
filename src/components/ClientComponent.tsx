"use client"

import React from 'react';

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster";
import Link from 'next/link';
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar";


import axios from "axios";

export function PostCardHeader({ title }: { title: string }) {
    const [fontSize, setFontSize] = React.useState("text-3xl sm:text-4xl md:text-5xl");

    const handleScroll = () => {
        const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
        // 确保字体大小变化在移动端不会导致第一行字体卡住
        const newFontSize = `text-${Math.max(2, 5 - Math.floor(scrollPercentage * 3))}xl sm:text-${Math.max(3, 4 - Math.floor(scrollPercentage * 2))}xl md:text-${Math.max(4, 5 - Math.floor(scrollPercentage))}xl`;
        setFontSize(newFontSize);
    };

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="sticky top-0 bg-white z-10 py-4 flex animate-slide-down flex-col w-full backdrop-blur-md bg-opacity-90">
            <h1 className={`${fontSize} transition-all duration-300`}>{title}</h1>
        </div>)
}



export function AdvancedSearchLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col">
            <div className="flex flex-col justify-center items-center p-16">
                <h4><Link href='/tools/advanced_search'>Advanced Search</Link></h4>
            </div>

            <div className='py-4'>
                <Menubar>
                    <MenubarMenu>
                        <MenubarTrigger><Link href='/tools/advanced_search'>Links</Link></MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger><Link href='/tools/advanced_search/utd'>UTD24</Link></MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger><Link href='/tools/advanced_search/ft'>FT50</Link></MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger><Link href='/tools/advanced_search/ais'>AIS</Link></MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>TJSEM</MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem>
                                <Link href='/tools/advanced_search/tjsem/table_i'>Table I</Link>
                            </MenubarItem>
                            <MenubarItem>
                                <Link href='/tools/advanced_search/tjsem/table_ii'>Table II</Link>
                            </MenubarItem>
                            <MenubarItem>
                                <Link href='/tools/advanced_search/tjsem/table_iii'>Table III</Link>
                            </MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            </div>

            <div>
                {children}
                <Toaster />
            </div>
        </div>
    );
}
