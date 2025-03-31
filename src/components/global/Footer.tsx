import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <div className="w-5/6 md:w-2/3 lg:w-1/2 flex flex-col space-y-8 mb-16 print:hidden">
            <div className="flex flex-row justify-center items-center space-x-4">
                <Image
                    src={"/favicon-32x32.png"}
                    width={16}
                    height={16}
                    alt="logo"
                    className="rotate-slowly"
                />
            </div>

            <div className="flex flex-row justify-center space-x-8 md:space-x-16">
                <div className="flex flex-col">
                    <span className="text-xxs">About</span>
                    <span className="text-gray-500 text-xxs dark:text-gray-300">
                        <Link href={"/resume"}>Resume</Link>
                    </span>
                    <span className="text-gray-500 text-xxs dark:text-gray-300">
                        <Link href={"/me/gallery"}>Gallery</Link>
                    </span>
                </div>
                <div className="flex flex-col">
                    <span className="text-xxs">Tools</span>
                    <span className="text-gray-500 text-xxs dark:text-gray-300">
                        <Link href={"/tools/advanced_search"}>Advanced Search</Link>
                    </span>
                    <span className="text-gray-500 text-xxs dark:text-gray-300">
                        <Link href={"/pow"}>PoW</Link>
                    </span>
                </div>
                <div className="flex flex-col">
                    <span className="text-xxs">Projects</span>
                    <span className="text-gray-500 text-xxs dark:text-gray-300">
                        <Link href={"https://github.com/sitdownkevin/Blackboard-Enhanced"}>BB Enhanced</Link>
                    </span>
                    <span className="text-gray-500 text-xxs dark:text-gray-300">
                        <Link
                            href={"https://sitdownkevin.github.io/dorm-wifi-tauri/"}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            DORM WIFI
                        </Link>
                    </span>
                    <span className="text-gray-500 text-xxs dark:text-gray-300">
                        <Link
                            href={
                                "https://github.com/sitdownkevin/Simple-Robotic-Hand-Control"
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            S-R-H-C
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
}