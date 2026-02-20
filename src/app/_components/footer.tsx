import Link from "next/link";

export function Footer() {
  return (
    <div className="w-full py-4 flex flex-row justify-center space-x-8 md:space-x-16 border-t border-gray-300">
      <div className="flex flex-col">
        <span className="text-xxs">
          <span className="text-xxs">About</span>
        </span>
        <span className="text-gray-500 text-xxs dark:text-gray-300">
          <Link href={"/about/resume"}>Resume</Link>
        </span>
        <span className="text-gray-500 text-xxs dark:text-gray-300">
          <Link href={"/about/gallery"}>Gallery</Link>
        </span>
        <span className="text-gray-500 text-xxs dark:text-gray-300">
          <Link href={"/about/get_my_wx"}>WeChat</Link>
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
            href={"https://github.com/sitdownkevin/Simple-Robotic-Hand-Control"}
            target="_blank"
            rel="noopener noreferrer"
          >
            S-R-H-C
          </Link>
        </span>
      </div>
    </div>
  );
}
