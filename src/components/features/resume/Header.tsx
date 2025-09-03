import { BasicInfoType } from "@/lib/resume/types";
import Link from "next/link";
// Import icons from lucide-react
import {
  Mail, // Replaces FaEnvelope
  Globe, // Replaces FaGlobe
  Phone, // Replaces FaPhone
  Linkedin, // Replaces FaLinkedin
  Github, // Replaces FaGithub
} from 'lucide-react';

// Define props interface
interface HeaderProps {
  basicInfo: BasicInfoType;
}

export default function Header({ basicInfo }: HeaderProps) {
  // Define common icon class for size and alignment
  const iconClass = "inline-block mr-1 h-3 w-3"; // Adjusted size

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4 font-bold text-2xl border-b-1 border-gray-300 pb-2">
        <div>
          {/* Keep the original name format for now */}
          {basicInfo.name.first_name} {basicInfo.name.last_name}
          {(basicInfo.name.first_name_en || basicInfo.name.last_name_en) && (
            <span> ({basicInfo.name.first_name_en} {basicInfo.name.last_name_en})</span>
          )}
        </div>
      </div>

      {/* Use flex-wrap for responsive layout */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
        {/* Phone */}
        {basicInfo.phone && (
          <div className="flex items-center"> {/* Keep items-center on individual items */}
            <Link
              href={`tel:${basicInfo.phone.prefix}${basicInfo.phone.number}`}
              className="hover:underline" // Removed flex items-center from Link, it's on the parent div now
            >
              <Phone className={iconClass} />
              {basicInfo.phone.prefix} {basicInfo.phone.number}
            </Link>
          </div>
        )}
        {/* Email */}
        {basicInfo.email && (
          <div className="flex items-center">
            <Link
              href={`mailto:${basicInfo.email}`}
              className="hover:underline"
            >
              <Mail className={iconClass} />
              {basicInfo.email}
            </Link>
          </div>
        )}
        {/* Website */}
        {basicInfo.website && (
          <div className="flex items-center">
            <Link
              href={`https://${basicInfo.website}`}
              target="_blank" // Open external links in new tab
              rel="noopener noreferrer" // Security best practice
              className="hover:underline"
            >
              <Globe className={iconClass} />
              {basicInfo.website}
            </Link>
          </div>
        )}
        {/* GitHub */}
        {basicInfo.github && (
          <div className="flex items-center">
            <Link
              href={`https://github.com/${basicInfo.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              <Github className={iconClass} />
              {basicInfo.github}
            </Link>
          </div>
        )}
        {/* LinkedIn */}
        {basicInfo.linkedin && (
          <div className="flex items-center">
            <Link
              href={`https://linkedin.com/in/${basicInfo.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              <Linkedin className={iconClass} />
              {basicInfo.linkedin}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
