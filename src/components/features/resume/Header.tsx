import { BasicInfoType } from "@/lib/resume/types";
import Link from "next/link";
import { Mail, Globe, Phone } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Fragment } from "react";

interface HeaderProps {
  basicInfo: BasicInfoType;
}

type ContactItem = {
  key: string;
  href: string;
  label: string;
  text: string;
  external?: boolean;
  icon: React.ReactNode;
};

function ContactLink({
  href,
  label,
  text,
  external,
  icon,
}: Omit<ContactItem, "key">) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-claude-orange"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="opacity-70">{icon}</span>
      <span>{text}</span>
    </Link>
  );
}

export default function Header({ basicInfo }: HeaderProps) {
  const fullName = `${basicInfo.name.first_name} ${basicInfo.name.last_name}`;
  const alias = basicInfo.name.first_name_en?.trim() || null;

  const contacts: ContactItem[] = [
    basicInfo.phone
      ? {
          key: "phone",
          href: `tel:${basicInfo.phone.prefix ?? ""}${basicInfo.phone.number}`,
          label: "Phone",
          text: `${basicInfo.phone.prefix ?? ""} ${basicInfo.phone.number}`.trim(),
          icon: <Phone className="h-3.5 w-3.5" />,
        }
      : null,
    basicInfo.email
      ? {
          key: "email",
          href: `mailto:${basicInfo.email}`,
          label: "Email",
          text: basicInfo.email,
          icon: <Mail className="h-3.5 w-3.5" />,
        }
      : null,
    basicInfo.website
      ? {
          key: "website",
          href: `https://${basicInfo.website}`,
          label: "Website",
          text: basicInfo.website,
          external: true,
          icon: <Globe className="h-3.5 w-3.5" />,
        }
      : null,
    basicInfo.github
      ? {
          key: "github",
          href: `https://github.com/${basicInfo.github}`,
          label: "GitHub",
          text: basicInfo.github,
          external: true,
          icon: <FaGithub className="h-3.5 w-3.5" />,
        }
      : null,
    basicInfo.linkedin
      ? {
          key: "linkedin",
          href: `https://linkedin.com/in/${basicInfo.linkedin}`,
          label: "LinkedIn",
          text: basicInfo.linkedin,
          external: true,
          icon: <FaLinkedin className="h-3.5 w-3.5" />,
        }
      : null,
  ].filter(Boolean) as ContactItem[];

  return (
    <header className="flex flex-col gap-3 pb-6 border-b border-border">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.15] text-balance flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
        <span>{fullName}</span>
        {alias ? (
          <span className="font-sans text-base sm:text-lg font-medium text-muted-foreground tracking-normal">
            {alias}
          </span>
        ) : null}
        <span
          className="inline-block w-2 h-2 rounded-sm bg-claude-orange shrink-0 translate-y-[-0.15em]"
          aria-hidden
        />
      </h1>

      {contacts.length > 0 ? (
        <ul className="flex flex-wrap items-center gap-y-2 text-xs list-none p-0 m-0">
          {contacts.map((contact, index) => (
            <Fragment key={contact.key}>
              {index > 0 ? (
                <li
                  aria-hidden
                  className="mx-2.5 text-border select-none"
                >
                  /
                </li>
              ) : null}
              <li className="inline-flex">
                <ContactLink {...contact} />
              </li>
            </Fragment>
          ))}
        </ul>
      ) : null}
    </header>
  );
}
