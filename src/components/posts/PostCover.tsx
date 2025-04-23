"use client";
import axios from "axios";
import Link from "next/link";
import { PostMatterType } from "@/lib/posts/types";
import { PinTopIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

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
          <span
            key={tag}
            className={`bg-gradient-to-r ${gradient.from} ${gradient.to} px-2 py-1 rounded-full`}
          >
            <p
              className={`bg-gradient-to-r ${gradient.textFrom} ${gradient.textTo} bg-clip-text text-transparent text-xs font-bold`}
            >
              {tag}
            </p>
          </span>
        );
      })}
    </div>
  );
}

export function DateTag({ date }: { date: Date }) {
  const pivotDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
  if (date.getTime() <= pivotDate.getTime()) {
    return null;
  }

  return (
    <p className="select-none text-gray-600 dark:text-gray-300 text-xs font-bold">
      {date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}
    </p>
  );
}

function Title({ matter }: { matter: PostMatterType }) {
  const handleClick = async () => {
    const response = await fetch(`/api/posts/view`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId: matter.id }),
    });
    console.log(response);
  };

  return (
    <div className="text-lg md:text-2xl font-bold truncate hover:opacity-80 select-none">
      <Link
        href={`/posts/${matter.id}`}
        className="hover:underline"
        onClick={handleClick}
      >
        {matter.title}
      </Link>
    </div>
  );
}

export function PostCover({
  matter,
  first = false,
}: {
  matter: PostMatterType;
  first?: boolean;
}) {
  return (
    <div
      className={`flex flex-col space-y-4 md:space-y-6 lg:space-y-8 p-4 border-b border-gray-200 dark:border-gray-800 ${first ? "" : ""} ${matter.pinned ? "" : ""}`}
    >
      <div className="flex justify-between items-start">
        <Title matter={matter} />
        {matter.pinned && <PinTopIcon className="w-4 h-4" />}
      </div>
      <div className="flex justify-between items-end">
        <Tag tags={matter.tags} />
        <DateTag date={matter.update_date} />
      </div>
    </div>
  );
}

export function PostCovers({ matterList }: { matterList: PostMatterType[] }) {
  const [visibleCount, setVisibleCount] = useState(5);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 5, matterList.length));
  };

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("visibleCount", String(visibleCount));
    }
  }, [visibleCount]);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("visibleCount", String(visibleCount));
    }
  }, [visibleCount]);

  const visiblePosts = matterList.slice(0, visibleCount);

  return (
    <div className="flex flex-col space-y-4 md:space-y-6 lg:space-y-8">
      <AnimatePresence>
        {visiblePosts.map((matter, index) => (
          <motion.div
            key={matter.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <PostCover matter={matter} first={index === 0} />
          </motion.div>
        ))}
      </AnimatePresence>
      {visibleCount < matterList.length && (
        <Button variant="secondary" size="sm" onClick={handleShowMore} className="w-full">
          展开更多
        </Button>
      )}
    </div>
  );
}