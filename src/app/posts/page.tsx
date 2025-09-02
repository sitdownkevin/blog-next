"use client";

import { useState, useEffect, useRef } from 'react'; // Import useRef
import { PostMatterType, MarkdownType } from "@/lib/posts/types";
import { PostCovers } from "@/components/posts/PostCover";
import { Input } from "@/components/ui/input";
import { remark } from 'remark';
import remarkHtml from 'remark-html';

export default function Page() {
    const [matterList, setMatterList] = useState<PostMatterType[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searching, setSearching] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null); // Create a ref for the input
    const [osShortcut, setOsShortcut] = useState(''); // State for OS shortcut

    useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await fetch('/api/posts/list');
                if (!res.ok) {
                    throw new Error(`Error: ${res.status}`);
                }
                const data: PostMatterType[] = await res.json();
                // Convert date strings back to Date objects
                const dataWithDates = data.map(matter => ({
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

    // Effect to handle keyboard shortcuts (Cmd/Ctrl+K to focus, Esc to unfocus)
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            console.log('Key pressed:', event.key, event.metaKey, event.ctrlKey); // Log any key press
            if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
                event.preventDefault();
                console.log('Cmd/Ctrl+K pressed, focusing input'); // Add log
                inputRef.current?.focus();
            } else if (event.key === 'Escape') {
                console.log('Escape pressed, attempting to blur-sm input'); // Add log
                console.log('inputRef.current:', inputRef.current); // Log ref value
                inputRef.current?.blur();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        // Detect OS for shortcut display
        const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        setOsShortcut(isMac ? '⌘K' : 'Ctrl+K');

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []); // Empty dependency array means this effect runs once on mount


    const matterListNotHidden = matterList.filter((matter) => !matter.hidden);

    // Split into pinned and unpinned posts
    const pinnedPosts = matterListNotHidden.filter((matter) => matter.pinned);
    const unpinnedPosts = matterListNotHidden.filter((matter) => !matter.pinned);

    // Sort both arrays by date
    const pinnedSorted = pinnedPosts.sort((a, b) => b.update_date.getTime() - a.update_date.getTime());
    const unpinnedSorted = unpinnedPosts.sort((a, b) => b.update_date.getTime() - a.update_date.getTime());

    // Combine the arrays with pinned posts first
    const matterListSorted = [...pinnedSorted, ...unpinnedSorted];

    // Filter posts based on search query and extract snippet
    const filteredMatterList = matterListSorted
        .map(matter => {
            const query = searchQuery.toLowerCase();
            const titleMatch = matter.title.toLowerCase().includes(query);
            const descriptionMatch = matter.description?.toLowerCase().includes(query);
            const tagsMatch = matter.tags?.some(tag => tag.toLowerCase().includes(query));
            const contentMatchIndex = matter.content?.toLowerCase().indexOf(query) ?? -1;
            const contentMatch = contentMatchIndex !== -1;

            let snippet = '';
            let snippetHtml = '';
            if (contentMatch && matter.content) {
                const snippetLength = 150; // Define snippet length
                const startIndex = Math.max(0, contentMatchIndex - Math.floor(snippetLength / 2));
                const endIndex = Math.min(matter.content.length, startIndex + snippetLength);
                snippet = matter.content.substring(startIndex, endIndex);
                // Add ellipsis if snippet is not the full content
                if (startIndex > 0) snippet = '...' + snippet;
                if (endIndex < matter.content.length) snippet = snippet + '...';

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
        .filter(matter => matter.matches); // Filter based on the new 'matches' property

    if (loading) {
        return <div className="w-full flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="w-full flex justify-center items-center h-screen text-red-500">Loading failed: {error}</div>;
    }

    return (
        <div className="w-full flex flex-col">
            <div className="mt-8 mb-8 w-full max-w-md mx-auto relative hidden md:block">
                <Input
                    ref={inputRef} // Assign the ref to the input
                    {...{
                        type: "text",
                        placeholder: "搜索文章...",
                        value: searchQuery,
                        onChange: (e) => setSearchQuery(e.target.value),
                        className: "pl-10 pr-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-all duration-200 ease-in-out shadow-xs",
                    } as React.InputHTMLAttributes<HTMLInputElement>}
                />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
                    <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                </svg>
                {osShortcut && ( // Display shortcut if detected
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-300 text-xs font-mono px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 shadow-xs">
                        {osShortcut}
                    </span>
                )}
            </div>
            <PostCovers matterList={filteredMatterList} searching={searching} />
        </div>
    )
}