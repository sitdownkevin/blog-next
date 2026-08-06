import { useState, useEffect, useRef } from "react";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  osShortcut: string;
  placeholder: string;
}

export function SearchBar({
  searchQuery,
  setSearchQuery,
  osShortcut,
  placeholder,
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className="w-full mb-8">
      <div
        className={`
          relative w-full h-11 rounded-md border bg-background transition-colors duration-200
          ${
            isFocused || searchQuery
              ? "border-claude-orange ring-1 ring-claude-orange/30"
              : "border-border hover:border-claude-orange/40"
          }
        `}
      >
        <div className="absolute inset-0 flex items-center">
          <div className="flex items-center gap-3 px-3 flex-1 min-w-0">
            <Search
              className={`h-4 w-4 shrink-0 transition-colors ${
                isFocused ? "text-claude-orange" : "text-muted-foreground"
              }`}
            />
            <Input
              ref={inputRef}
              type="text"
              placeholder={placeholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="flex-1 border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          {osShortcut && (
            <div className="flex items-center px-3 shrink-0">
              <Badge
                variant="secondary"
                className={`text-xs font-mono px-2 py-0.5 hidden sm:inline-flex transition-opacity ${
                  isFocused ? "opacity-50" : "opacity-100"
                }`}
              >
                {osShortcut}
              </Badge>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
