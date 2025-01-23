
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
                        <MenubarTrigger><Link href='/tools/advanced_search/tjsem'>TJSEM</Link></MenubarTrigger>
                    </MenubarMenu>
                </Menubar>
            </div>

            <div>
                {children}
            </div>
        </div>
    )
}