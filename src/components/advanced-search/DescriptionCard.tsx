import Link from "next/link";

export default function DescriptionCard({
  title,
  link,
}: {
  title: string;
  link: string;
}) {
  return (
    <div className="w-full p-2 flex justify-center items-center">
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
