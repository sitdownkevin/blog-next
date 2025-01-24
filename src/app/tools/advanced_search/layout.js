"use client"
import { Toaster } from "@/components/ui/toaster";

import Link from 'next/link'

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
} from "@/components/ui/menubar"
import { Menu } from 'lucide-react'


export default function PostLayout({ children }) {
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
    )
}