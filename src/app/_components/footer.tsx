import Link from "next/link";

function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      className="text-muted-foreground text-xxs hover:text-claude-orange transition-colors duration-300"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <div className="w-full py-4 flex flex-row justify-center space-x-8 md:space-x-16 border-t border-border">
      <div className="flex flex-col gap-0.5">
        <span className="text-xxs font-semibold tracking-wide">About</span>
        <FooterLink href="/about/resume">Resume</FooterLink>
        <FooterLink href="/about/gallery">Gallery</FooterLink>
        <FooterLink href="/about/get_my_wx">WeChat</FooterLink>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-xxs font-semibold tracking-wide">Tools</span>
        <FooterLink href="/tools/advanced_search">Advanced Search</FooterLink>
        <FooterLink href="/tools/gpt_4o_image_prompts">
          GPT-4o Prompts
        </FooterLink>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-xxs font-semibold tracking-wide">Projects</span>
        <FooterLink href="https://github.com/sitdownkevin/Blackboard-Enhanced">
          BB Enhanced
        </FooterLink>
        <FooterLink
          href="https://sitdownkevin.github.io/dorm-wifi-tauri/"
          external
        >
          DORM WIFI
        </FooterLink>
        <FooterLink
          href="https://github.com/sitdownkevin/Simple-Robotic-Hand-Control"
          external
        >
          S-R-H-C
        </FooterLink>
      </div>
    </div>
  );
}
