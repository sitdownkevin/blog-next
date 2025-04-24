'use client';

import { useEffect, useRef } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { CodeBlock } from './CodeBlock';

interface EnhancedMarkdownBodyProps {
  markdownHtml: string;
}

export function EnhancedMarkdownBody({ markdownHtml }: EnhancedMarkdownBodyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const codeBlockRoots = useRef<Root[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const codeBlocks = containerRef.current.querySelectorAll('div[data-code-block]');

    // Clean up previous roots
    codeBlockRoots.current.forEach(root => root.unmount());
    codeBlockRoots.current = [];

    codeBlocks.forEach(async (codeBlockWrapper) => {
      // Find the pre and code elements within the wrapper
      const preElement = codeBlockWrapper.querySelector('pre');
      const codeElement = codeBlockWrapper.querySelector('code');

      if (preElement && codeElement) {
        const codeContent = codeElement.textContent || '';
        const languageMatch = codeElement.className.match(/language-(\w+)/);
        const language = languageMatch ? languageMatch[1] : undefined;

        // Create a temporary container for the React component
        const reactContainer = document.createElement('div');
        // Replace the original wrapper with the new container
        codeBlockWrapper.parentNode?.replaceChild(reactContainer, codeBlockWrapper);

        // Render the CodeBlock component into the temporary container
        const root = createRoot(reactContainer);
        root.render(<CodeBlock code={codeContent} language={language} />);
        codeBlockRoots.current.push(root);
      }
    });

    // Cleanup function to unmount components when the effect cleans up
    return () => {
      codeBlockRoots.current.forEach(root => root.unmount());
      codeBlockRoots.current = [];
    };
  }, [markdownHtml]); // Re-run effect if markdownHtml changes

  return (
    <div ref={containerRef} dangerouslySetInnerHTML={{ __html: markdownHtml }} />
  );
}