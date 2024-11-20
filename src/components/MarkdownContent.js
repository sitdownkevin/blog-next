'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const MermaidDiagram = dynamic(() => import('./MermaidDiagram'), {
  ssr: false
});

export default function MarkdownContent({ content }) {
  const containerRef = useRef();

  useEffect(() => {
    // Find all pre > code.language-mermaid elements
    const mermaidBlocks = containerRef.current.querySelectorAll('pre > code.language-mermaid');
    
    mermaidBlocks.forEach((block) => {
      const pre = block.parentElement;
      const content = block.textContent;
      
      // Create a new div for the Mermaid diagram
      const mermaidContainer = document.createElement('div');
      pre.parentNode.insertBefore(mermaidContainer, pre);
      
      // Remove the original pre element
      pre.remove();
      
      // Render the Mermaid diagram
      const root = ReactDOM.createRoot(mermaidContainer);
      root.render(<MermaidDiagram content={content} />);
    });
  }, [content]);

  return (
    <div 
      ref={containerRef} 
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: content }} 
    />
  );
}
