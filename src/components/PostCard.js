'use client';

import Link from "next/link";
import { PostCardHeader } from "@/components/ClientComponent";
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import * as ReactDOM from 'react-dom/client';

const Mermaid = dynamic(() => import('./Mermaid'), {
  ssr: false
});

function Tags({ tagList }) {
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

export function PostCardCover({ post }) {
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

export function PostCard({ post }) {
  const contentRef = useRef();

  useEffect(() => {
    if (contentRef.current) {
      // Find all pre > code.language-mermaid elements
      const mermaidBlocks = contentRef.current.querySelectorAll('pre > code.language-mermaid');
      
      mermaidBlocks.forEach((block, index) => {
        const pre = block.parentElement;
        const content = block.textContent;
        
        // Create a new div for the Mermaid diagram
        const mermaidContainer = document.createElement('div');
        pre.parentNode.insertBefore(mermaidContainer, pre);
        
        // Remove the original pre element
        pre.remove();
        
        // Create a new root and render the Mermaid component
        const root = document.createElement('div');
        mermaidContainer.appendChild(root);
        const mermaidInstance = <Mermaid chart={content} id={`${post.id}-${index}`} />;
        ReactDOM.createRoot(root).render(mermaidInstance);
      });
    }
  }, [post.contentHtml, post.id]);

  return (
    <div className="flex flex-col items-start justify-center">
      <PostCardHeader title={post.title} />
      <div className="mb-4">
        <Tags tagList={post.tagList} />
      </div>
      <div className="w-full mt-16 markdown-body">
        <div 
          ref={contentRef}
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}>
        </div>
      </div>
    </div>
  );
}
