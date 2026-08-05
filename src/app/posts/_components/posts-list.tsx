"use client";

import { useState, useEffect } from "react";
import { remark } from "remark";
import remarkHtml from "remark-html";

import { PostMatterType } from "@/lib/posts/types";
import { SearchBar } from "./search-bar";
import { CoverContainer } from "./cover-container";

type SerializedPostMatter = Omit<
  PostMatterType,
  "create_date" | "update_date"
> & {
  create_date?: string;
  update_date?: string;
};

function toDate(value?: string): Date | undefined {
  return value ? new Date(value) : undefined;
}

function normalizeMatterList(
  matterList: SerializedPostMatter[],
): PostMatterType[] {
  return matterList.map((matter) => ({
    ...matter,
    create_date: toDate(matter.create_date),
    update_date: toDate(matter.update_date),
  }));
}

export function PostsList({
  initialMatterList,
}: {
  initialMatterList: SerializedPostMatter[];
}) {
  const [matterList] = useState(() => normalizeMatterList(initialMatterList));
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [osShortcut, setOsShortcut] = useState("");

  useEffect(() => {
    setSearching(searchQuery.length > 0);
  }, [searchQuery]);

  useEffect(() => {
    const isMac =
      typeof navigator !== "undefined" &&
      navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    setOsShortcut(isMac ? "⌘K" : "Ctrl+K");
  }, []);

  const pinnedPosts = matterList.filter((matter) => matter.pinned);
  const unpinnedPosts = matterList.filter((matter) => !matter.pinned);

  const pinnedSorted = [...pinnedPosts].sort(
    (a, b) => (b.update_date?.getTime() ?? 0) - (a.update_date?.getTime() ?? 0),
  );
  const unpinnedSorted = [...unpinnedPosts].sort(
    (a, b) => (b.update_date?.getTime() ?? 0) - (a.update_date?.getTime() ?? 0),
  );

  const matterListSorted = [...pinnedSorted, ...unpinnedSorted];

  const filteredMatterList = matterListSorted
    .map((matter) => {
      const query = searchQuery.toLowerCase();
      const titleMatch = matter.title.toLowerCase().includes(query);
      const descriptionMatch = matter.description
        ?.toLowerCase()
        .includes(query);
      const tagsMatch = matter.tags?.some((tag) =>
        tag.toLowerCase().includes(query),
      );
      const contentMatchIndex =
        matter.content?.toLowerCase().indexOf(query) ?? -1;
      const contentMatch = contentMatchIndex !== -1;

      let snippet = "";
      let snippetHtml = "";
      if (contentMatch && matter.content) {
        const snippetLength = 150;
        const startIndex = Math.max(
          0,
          contentMatchIndex - Math.floor(snippetLength / 2),
        );
        const endIndex = Math.min(
          matter.content.length,
          startIndex + snippetLength,
        );
        snippet = matter.content.substring(startIndex, endIndex);
        if (startIndex > 0) snippet = "..." + snippet;
        if (endIndex < matter.content.length) snippet = snippet + "...";

        snippetHtml = remark().use(remarkHtml).processSync(snippet).toString();
      }

      return {
        ...matter,
        snippet,
        snippetHtml,
        matches: titleMatch || descriptionMatch || tagsMatch || contentMatch,
      };
    })
    .filter((matter) => matter.matches);

  return (
    <div className="w-full flex flex-col py-8 px-4">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-balance">
          Posts
        </h1>
        <p className="text-sm text-muted-foreground">
          Notes on research, tools, and building things.
        </p>
      </div>

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        osShortcut={osShortcut}
      />
      <CoverContainer matterList={filteredMatterList} searching={searching} />
    </div>
  );
}
