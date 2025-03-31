import { BasicInfoType } from "@/lib/resume/types";
import Link from "next/link";
import {
  FaWeixin,
  FaEnvelope,
  FaGlobe,
  FaPhone,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

export default function Header({ basicInfo }: { basicInfo: BasicInfoType }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4 font-bold text-2xl border-b-2 border-gray-300 pb-2">
        <div>
          {basicInfo.name.first_name} ({basicInfo.name.first_name_en}){" "}
          {basicInfo.name.last_name}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
        <div className="text-xs">
          <Link
            href={`tel:${basicInfo.phone?.prefix}${basicInfo.phone?.number}`}
          >
            <FaPhone className="inline-block mr-1" />
            {basicInfo.phone?.prefix} {basicInfo.phone?.number}
          </Link>
        </div>
        <div className="text-xs">
          <Link href={`mailto:${basicInfo.email}`}>
            <FaEnvelope className="inline-block mr-1" />
            {basicInfo.email}
          </Link>
        </div>
        {basicInfo.website && (
          <div className="text-xs">
            <Link href={`https://${basicInfo.website}`}>
              <FaGlobe className="inline-block mr-1" />
              {basicInfo.website}
            </Link>
          </div>
        )}
        {basicInfo.linkedin && (
          <div className="text-xs">
            <Link href={`https://www.linkedin.com/in/${basicInfo.linkedin}`}>
              <FaLinkedin className="inline-block mr-1" />
              {basicInfo.linkedin}
            </Link>
          </div>
        )}
        {basicInfo.github && (
          <div className="text-xs">
            <Link href={`https://github.com/${basicInfo.github}`}>
              <FaGithub className="inline-block mr-1" />
              {basicInfo.github}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
