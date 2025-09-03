"use client";

import { useState, useEffect, useRef } from "react";
import { PostMatterType, MarkdownType } from "@/lib/posts/types";
import { CoverList } from "@/components/features/posts/Cover";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Keyboard } from "lucide-react";
import { remark } from "remark";
import remarkHtml from "remark-html";

// SearchBar Component
interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  osShortcut: string;
}

function SearchBar({
  searchQuery,
  setSearchQuery,
  osShortcut,
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Effect to handle keyboard shortcuts (Cmd/Ctrl+K to focus, Esc to blur)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
        setIsFocused(true);
      } else if (event.key === "Escape") {
        event.preventDefault();
        inputRef.current?.blur();
        setIsFocused(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="mt-6 mb-8 w-full max-w-lg mx-auto px-4 sm:px-0">
      <div className="relative group">
        <div className={`
          relative w-full h-12 rounded-lg border-2 transition-all duration-300 shadow-sm
          ${isFocused || searchQuery
            ? 'border-primary shadow-md bg-background'
            : 'border-dashed border-border hover:border-primary/50 bg-background hover:shadow-md'
          }
        `}>
          <div className="absolute inset-0 flex items-center">
            <div className="flex items-center gap-3 px-4 flex-1">
              <Search className={`h-4 w-4 flex-shrink-0 transition-colors ${
                isFocused ? 'text-primary' : 'text-muted-foreground'
              }`} />
              <Input
                ref={inputRef}
                type="text"
                placeholder="搜索文章标题、描述、标签或内容..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="flex-1 border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <div className="flex items-center gap-2 px-4 flex-shrink-0">
              {osShortcut && (
                <Badge
                  variant="secondary"
                  className={`text-xs font-mono px-2 py-1 hidden sm:inline-flex transition-opacity ${
                    isFocused ? 'opacity-50' : 'opacity-100'
                  }`}
                >
                  {osShortcut}
                </Badge>
              )}
              <Keyboard className={`h-4 w-4 transition-colors ${
                isFocused ? 'text-primary opacity-50' : 'text-muted-foreground opacity-50'
              }`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
          create_date: new Date(matter.create_date),
          update_date: new Date(matter.update_date),
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
    (a, b) => b.update_date.getTime() - a.update_date.getTime()
  );
  const unpinnedSorted = unpinnedPosts.sort(
    (a, b) => b.update_date.getTime() - a.update_date.getTime()
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
        tag.toLowerCase().includes(query)
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
          contentMatchIndex - Math.floor(snippetLength / 2)
        );
        const endIndex = Math.min(
          matter.content.length,
          startIndex + snippetLength
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
    <div className="w-full flex flex-col">
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        osShortcut={osShortcut}
      />
      <CoverList matterList={filteredMatterList} searching={searching} />
    </div>
  );
}
