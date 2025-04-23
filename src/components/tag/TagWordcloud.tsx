"use client";

import ReactWordcloud from 'react-wordcloud';

interface TagWordcloudProps {
  words: { text: string; value: number }[];
  options: any; // Define a more specific type if possible
}

export default function TagWordcloud({ words, options }: TagWordcloudProps) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <ReactWordcloud words={words} options={options} />
    </div>
  );
}