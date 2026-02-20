import { useState, useEffect, useRef } from "react";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Keyboard } from "lucide-react";

// SearchBar Component
interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  osShortcut: string;
}

export function SearchBar({
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
        <div
          className={`
            relative w-full h-12 rounded-lg border-2 transition-all duration-300 shadow-sm
            ${
              isFocused || searchQuery
                ? "border-primary shadow-md bg-background"
                : "border-dashed border-border hover:border-primary/50 bg-background hover:shadow-md"
            }
          `}
        >
          <div className="absolute inset-0 flex items-center">
            <div className="flex items-center gap-3 px-4 flex-1">
              <Search
                className={`h-4 w-4 flex-shrink-0 transition-colors ${
                  isFocused ? "text-primary" : "text-muted-foreground"
                }`}
              />
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
                  className={`text-xs font-sans px-2 py-1 hidden sm:inline-flex transition-opacity ${
                    isFocused ? "opacity-50" : "opacity-100"
                  }`}
                >
                  {osShortcut}
                </Badge>
              )}
              <Keyboard
                className={`h-4 w-4 transition-colors ${
                  isFocused
                    ? "text-primary opacity-50"
                    : "text-muted-foreground opacity-50"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
