"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const MdxEditorInner = dynamic(() => import("./mdx-editor-inner"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[360px] items-center justify-center gap-2 rounded-md border text-sm text-muted-foreground">
      <Loader2 className="size-4 animate-spin" />
      Loading editor…
    </div>
  ),
});

type AdminMdxEditorProps = {
  markdown: string;
  onChange: (markdown: string) => void;
  /** Remount editor when switching posts / after async load */
  editorKey?: string;
};

export function AdminMdxEditor({
  markdown,
  onChange,
  editorKey,
}: AdminMdxEditorProps) {
  return (
    <MdxEditorInner key={editorKey} markdown={markdown} onChange={onChange} />
  );
}
