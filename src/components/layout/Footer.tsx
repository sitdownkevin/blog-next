import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="w-5/6 md:w-2/3 lg:w-1/2 flex flex-col space-y-8 py-4 mb-16 print:hidden border-t-1 border-gray-300">
      <div className="flex flex-row justify-center space-x-8 md:space-x-16">
        <div className="flex flex-col">
          <span className="text-xxs">About</span>
          <span className="text-gray-500 text-xxs dark:text-gray-300">
            <Link href={"/about/resume"}>Resume</Link>
          </span>
          <span className="text-gray-500 text-xxs dark:text-gray-300">
            <Link href={"/about/gallery"}>Gallery</Link>
          </span>
          <span className="text-gray-500 text-xxs dark:text-gray-300">
            <Link href={"/about/pow"}>WeChat</Link>
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xxs">Tools</span>
          <span className="text-gray-500 text-xxs dark:text-gray-300">
            <Link href={"/tools/advanced_search"}>Advanced Search</Link>
          </span>
          <span className="text-gray-500 text-xxs dark:text-gray-300">
            <Link href={"/tools/gpt_4o_image_prompts"}>GPT-4o Prompts</Link>
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xxs">Projects</span>
          <span className="text-gray-500 text-xxs dark:text-gray-300">
            <Link href={"https://github.com/sitdownkevin/Blackboard-Enhanced"}>
              BB Enhanced
            </Link>
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
