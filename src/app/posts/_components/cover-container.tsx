"use client";

import { PostMatterType } from "@/lib/posts/types";
import { Pin } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { EnhancedMarkdownBody } from "./markdown-body";
import { CoverTags } from "./cover-tags";
import { CoverDate } from "./cover-date";
import { CoverTitle } from "./cover-title";

interface CoverProps {
  matter: PostMatterType;
  searching: boolean;
}

interface CoverContainerProps {
  matterList: PostMatterType[];
  searching: boolean;
}

export function Cover({ matter, searching }: CoverProps) {
  return (
    <article className="group flex flex-col gap-2 py-4 border-t border-border first:border-t-0 first:pt-0">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6">
        <div className="flex items-start gap-2 min-w-0">
          <CoverTitle title={matter.title} postId={matter.id} />
          {matter.pinned && (
            <Pin
              className="w-3.5 h-3.5 mt-1.5 text-claude-orange shrink-0"
              aria-label="Pinned"
            />
          )}
        </div>
        {matter.update_date && <CoverDate date={matter.update_date} />}
      </div>

      {matter.description && !searching && (
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 max-w-[65ch]">
          {matter.description}
        </p>
      )}

      {searching && matter.snippetHtml && (
        <div className="text-sm text-muted-foreground mt-1 w-full wrap-break-word">
          <EnhancedMarkdownBody markdownHtml={matter.snippetHtml} />
        </div>
      )}

      <CoverTags tags={matter.tags} />
    </article>
  );
}

function LoadMore({ handleShowMore }: { handleShowMore: () => void }) {
  return (
    <button
      type="button"
      onClick={handleShowMore}
      className="w-full mt-2 py-2.5 text-sm font-medium text-muted-foreground border border-border rounded-md transition-colors hover:border-claude-orange hover:text-claude-orange active:scale-[0.99] cursor-pointer"
    >
      Load more
    </button>
  );
}

export function CoverContainer({ matterList, searching }: CoverContainerProps) {
  const [visibleCount, setVisibleCount] = useState(8);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 8, matterList.length));
  };

  const visiblePosts = matterList.slice(0, visibleCount);

  if (matterList.length === 0) {
    return (
      <p className="py-10 text-sm text-muted-foreground text-center">
        No posts matched your search.
      </p>
    );
  }

  return (
    <div className="flex flex-col">
      <AnimatePresence initial={false}>
        {visiblePosts.map((matter) => (
          <motion.div
            key={matter.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Cover matter={matter} searching={searching} />
          </motion.div>
        ))}
      </AnimatePresence>
      {visibleCount < matterList.length && (
        <LoadMore handleShowMore={handleShowMore} />
      )}
    </div>
  );
}
