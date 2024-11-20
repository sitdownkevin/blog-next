'use client';

import mermaid from 'mermaid';
import { useEffect, useRef } from 'react';

mermaid.initialize({
  startOnLoad: true,
  theme: 'default',
  securityLevel: 'loose',
  htmlLabels: true,
  fontSize: 14,
  flowchart: {
    nodeSpacing: 30,
    rankSpacing: 30,
    curve: 'basis',
    padding: 15,
    useMaxWidth: true
  },
  sequence: {
    useMaxWidth: true,
    width: 150,
    height: 35
  }
});

export default function Mermaid({ chart, id }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      mermaid.render(`mermaid-${id}`, chart).then((result) => {
        ref.current.innerHTML = result.svg;
        // Add styles to the SVG to maintain size
        const svg = ref.current.querySelector('svg');
        if (svg) {
          svg.style.width = '100%';
          svg.style.maxWidth = '700px'; 
          svg.style.minWidth = '200px';
          svg.style.height = 'auto';
          
          // Add styles to all nodes to limit their size
          const nodes = svg.querySelectorAll('.node');
          nodes.forEach(node => {
            node.style.maxWidth = '200px';
            node.style.wordBreak = 'break-word';
          });
        }
      });
    }
  }, [chart, id]);

  return (
    <div className="flex justify-center my-16">
      <div ref={ref} className="w-full max-w-[700px]" />
    </div>
  );
}
