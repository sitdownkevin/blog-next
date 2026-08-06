"use client";

import { PostMatterType } from "@/lib/posts/types";
import { Pin, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

import { EnhancedMarkdownBody } from "./markdown-body";
import { CoverTags } from "./cover-tags";
import { CoverDate } from "./cover-date";
import { CoverTitle } from "./cover-title";

const PAGE_SIZE = 8;

interface CoverProps {
  matter: PostMatterType;
  searching: boolean;
}

interface CoverContainerProps {
  matterList: PostMatterType[];
  searching: boolean;
}

export function Cover({ matter, searching }: CoverProps) {
  const t = useTranslations("Posts");

  return (
    <article className="group flex flex-col gap-2 py-4 border-t border-border first:border-t-0 first:pt-0">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6">
        <div className="flex items-start gap-2 min-w-0">
          <CoverTitle title={matter.title} postId={matter.id} />
          {matter.pinned && (
            <Pin
              className="w-3.5 h-3.5 mt-1.5 text-claude-orange shrink-0"
              aria-label={t("pinned")}
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

export function CoverContainer({ matterList, searching }: CoverContainerProps) {
  const t = useTranslations("Posts");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const listSignature = matterList.map((matter) => matter.id).join(",");
  const hasMore = visibleCount < matterList.length;

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [listSignature]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((prev) =>
            Math.min(prev + PAGE_SIZE, matterList.length),
          );
        }
      },
      { rootMargin: "240px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, visibleCount, matterList.length]);

  const visiblePosts = matterList.slice(0, visibleCount);

  if (matterList.length === 0) {
    return (
      <p className="py-10 text-sm text-muted-foreground text-center">
        {t("noMatches")}
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
      {hasMore && (
        <div
          ref={sentinelRef}
          className="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground"
          aria-live="polite"
          aria-busy="true"
        >
          <Loader2 className="size-4 animate-spin" aria-hidden />
          <span>{t("loadingMore")}</span>
        </div>
      )}
    </div>
  );
}
