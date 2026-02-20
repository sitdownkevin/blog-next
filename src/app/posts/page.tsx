"use client";

import { useState, useEffect } from "react";
import { PostMatterType } from "@/lib/posts/types";

import { remark } from "remark";
import remarkHtml from "remark-html";

import { SearchBar } from "./_components/search-bar";
import { CoverContainer } from "./_components/cover-container";

export default function Page() {
  const [matterList, setMatterList] = useState<PostMatterType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [osShortcut, setOsShortcut] = useState(""); // State for OS shortcut

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/posts/list");
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        const data: PostMatterType[] = await res.json();
        // Convert date strings back to Date objects
        const dataWithDates = data.map((matter) => ({
          ...matter,
          create_date: matter.create_date
            ? new Date(matter.create_date)
            : undefined,
          update_date: matter.update_date
            ? new Date(matter.update_date)
            : undefined,
        }));
        setMatterList(dataWithDates);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setSearching(true);
    } else {
      setSearching(false);
    }
  }, [searchQuery]);

  // Detect OS for shortcut display
  useEffect(() => {
    const isMac =
      typeof navigator !== "undefined" &&
      navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    setOsShortcut(isMac ? "⌘K" : "Ctrl+K");
  }, []);

  const matterListNotHidden = matterList.filter((matter) => !matter.hidden);

  // Split into pinned and unpinned posts
  const pinnedPosts = matterListNotHidden.filter((matter) => matter.pinned);
  const unpinnedPosts = matterListNotHidden.filter((matter) => !matter.pinned);

  // Sort both arrays by date
  const pinnedSorted = pinnedPosts.sort(
    (a, b) => (b.update_date?.getTime() ?? 0) - (a.update_date?.getTime() ?? 0),
  );
  const unpinnedSorted = unpinnedPosts.sort(
    (a, b) => (b.update_date?.getTime() ?? 0) - (a.update_date?.getTime() ?? 0),
  );

  // Combine the arrays with pinned posts first
  const matterListSorted = [...pinnedSorted, ...unpinnedSorted];

  // Filter posts based on search query and extract snippet
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
        const snippetLength = 150; // Define snippet length
        const startIndex = Math.max(
          0,
          contentMatchIndex - Math.floor(snippetLength / 2),
        );
        const endIndex = Math.min(
          matter.content.length,
          startIndex + snippetLength,
        );
        snippet = matter.content.substring(startIndex, endIndex);
        // Add ellipsis if snippet is not the full content
        if (startIndex > 0) snippet = "..." + snippet;
        if (endIndex < matter.content.length) snippet = snippet + "...";

        // Convert snippet Markdown to HTML
        snippetHtml = remark().use(remarkHtml).processSync(snippet).toString();
      }

      return {
        ...matter,
        snippet: snippet, // Keep raw snippet for potential future use
        snippetHtml: snippetHtml, // Add HTML snippet
        matches: titleMatch || descriptionMatch || tagsMatch || contentMatch,
      };
    })
    .filter((matter) => matter.matches); // Filter based on the new 'matches' property

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center items-center h-screen text-red-500">
        Loading failed: {error}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col py-8 px-4">
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        osShortcut={osShortcut}
      />
      <CoverContainer matterList={filteredMatterList} searching={searching} />
    </div>
  );
}
