import { menubarComponents } from "@/lib/tools/advanced-search/data"; // Import data from lib/tools/advanced-search
import MenubarClient from "./MenubarClient"; // Import the client component

export default function Menubar() {
    return (
        <MenubarClient components={menubarComponents} />
    );
}
