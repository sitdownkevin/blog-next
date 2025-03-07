'use client';

import Link from "next/link";
import { PostCardHeader } from "@/components/ClientComponent";
import { useEffect } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
});

function Tags({ tagList }: { tagList: string[] }) {
  return (
    <>
      <div className="flex flex-row items-center flex-wrap">
        {tagList.map((tag) => (
          <span
            key={tag}
            className="mr-4 mt-4 px-3 py-1 
                text-gray-400 text-xs 
                rounded-lg border-2 border-gray-300 
                font-black transition-all duration-300 
                hover:text-black hover:border-gray-500 hover:scale-105"
          >
            {tag}
          </span>
        ))}
      </div>
    </>
  );
}

export function PostCardCover({ post }: { post: any }) {
  return (
    <>
      <Link href={`posts/${post.id}`} className="block">
        <div
          className={`flex flex-col p-8 w-full mb-4 border rounded-lg
                transition-transform duration-300 hover:scale-105 hover:shadow-lg 
                ${
                  post.pinned
                    ? "bg-gray-100 border-gray-300 shadow-gray-300/50 bg-surface-gloss"
                    : "hover:shadow-gray-500/50 bg-surface-gloss"
                }`}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl overflow-hidden whitespace-nowrap text-ellipsis transition-all duration-300">
            {post.title}
          </h1>
          <Tags
            tagList={post.pinned ? ["Pinned", ...post.tagList] : post.tagList}
          />
        </div>
      </Link>
    </>
  );
}

export function PostCard({ post }: { post: any }) {
  useEffect(() => {
    const diagrams = document.querySelectorAll('.mermaid');
    if (diagrams.length > 0) {
      mermaid.init(undefined, '.mermaid').catch(error => {
        console.error('Mermaid initialization error:', error);
      });
    }
  }, [post.contentHtml]);

  return (
    <div className="flex flex-col items-start justify-center">
      <PostCardHeader title={post.title} />
      <div className="mb-4">
        <Tags tagList={post.tagList} />
      </div>
      <div className="w-full mt-16 markdown-body">
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }}></div>
      </div>
    </div>
  );
}
