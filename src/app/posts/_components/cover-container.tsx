"use client";

import { PostMatterType } from "@/lib/posts/types";
import { PinTopIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

import { EnhancedMarkdownBody } from "./markdown-body";
import { CoverTags } from "./cover-tags";
import { CoverDate } from "./cover-date";
import { CoverTitle } from "./cover-title";

interface CoverProps {
  matter: PostMatterType;
  searching: boolean;
  first?: boolean;
}

interface CoverContainerProps {
  matterList: PostMatterType[];
  searching: boolean;
}

export function Cover({ matter, searching, first = false }: CoverProps) {
  return (
    <div
      className={`flex flex-col space-y-2 md:space-y-4 lg:space-y-6 p-4 border-b border-gray-200 dark:border-gray-700 ${first ? "" : ""} ${matter.pinned ? "" : ""}`}
    >
      <div className="flex justify-between items-start">
        <CoverTitle title={matter.title} postId={matter.id} />
        {matter.pinned && <PinTopIcon className="w-4 h-4" />}
      </div>
      {/* Use EnhancedMarkdownBody to render snippetHtml */}
      {searching && matter.snippetHtml && (
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 w-full break-words">
          <EnhancedMarkdownBody markdownHtml={matter.snippetHtml} />
        </div>
      )}
      <div className="flex justify-between items-end">
        <CoverTags tags={matter.tags} />
        <CoverDate date={matter.update_date} />
      </div>
    </div>
  );
}

function LoadMore({ handleShowMore }: { handleShowMore: () => void }) {
  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={handleShowMore}
      className="w-full"
    >
      展开更多
    </Button>
  );
}

export function CoverContainer({ matterList, searching }: CoverContainerProps) {
  const [visibleCount, setVisibleCount] = useState(5);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 5, matterList.length));
  };

  const visiblePosts = matterList.slice(0, visibleCount);

  return (
    <div className="flex flex-col space-y-2 lg:space-y-4">
      <AnimatePresence>
        {visiblePosts.map((matter, index) => (
          <motion.div
            key={matter.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Cover matter={matter} first={index === 0} searching={searching} />
          </motion.div>
        ))}
      </AnimatePresence>
      {visibleCount < matterList.length && (
        <LoadMore handleShowMore={handleShowMore} />
      )}
    </div>
  );
}
