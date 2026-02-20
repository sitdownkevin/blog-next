import Link from "next/link";

export default function DescriptionCard({
  title,
  link,
}: {
  title: string;
  link: string;
}) {
  return (
    <div className="w-full p-4 flex flex-col border-t">
      <div className="text-sm text-gray-500 font-bold">Source from</div>
      <Link
        href={link}
        className="text-gray-500 hover:underline hover:text-gray-700"
        target="_blank"
      >
        {title}
      </Link>
    </div>
  );
}
