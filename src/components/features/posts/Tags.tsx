import Link from "next/link";

export function Tag({ tags }: { tags: string[] }) {
  const gradients = [
    {
      from: "from-blue-100",
      to: "to-purple-100",
      textFrom: "from-blue-400",
      textTo: "to-purple-400",
    },
    {
      from: "from-green-100",
      to: "to-teal-100",
      textFrom: "from-green-400",
      textTo: "to-teal-400",
    },
    {
      from: "from-orange-100",
      to: "to-red-100",
      textFrom: "from-orange-400",
      textTo: "to-red-400",
    },
    {
      from: "from-pink-100",
      to: "to-rose-100",
      textFrom: "from-pink-400",
      textTo: "to-rose-400",
    },
    {
      from: "from-violet-100",
      to: "to-indigo-100",
      textFrom: "from-violet-400",
      textTo: "to-indigo-400",
    },
  ];

  const getGradient = (tag: string) => {
    // Simple hash function to get consistent colors for tags
    const hash = tag.split("").reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    return gradients[Math.abs(hash) % gradients.length];
  };

  return (
    <div className="flex flex-wrap gap-2 hover:opacity-80 select-none hover:scale-105 transition-all duration-300">
      {tags.map((tag) => {
        const gradient = getGradient(tag);
        return (
          <Link
            href={`/posts/tags/${tag}`}
            key={tag}
            className={`bg-linear-to-r ${gradient.from} ${gradient.to} px-2 py-1 rounded-full`}
          >
            <p
              className={`bg-linear-to-r ${gradient.textFrom} ${gradient.textTo} bg-clip-text text-transparent text-xs font-bold`}
            >
              {tag}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
