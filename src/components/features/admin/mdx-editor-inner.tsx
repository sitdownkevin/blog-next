"use client";

import { useRef } from "react";
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  linkPlugin,
  linkDialogPlugin,
  tablePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  imagePlugin,
  jsxPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  CodeToggle,
  BlockTypeSelect,
  CreateLink,
  InsertTable,
  InsertThematicBreak,
  InsertCodeBlock,
  InsertImage,
  ListsToggle,
  Separator,
  DiffSourceToggleWrapper,
  GenericJsxEditor,
  type JsxComponentDescriptor,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

import {
  fromEditorMarkdown,
  toEditorMarkdown,
} from "@/lib/posts/mdx-editor-markdown";

const htmlImgDescriptor: JsxComponentDescriptor = {
  name: "img",
  kind: "flow",
  props: [
    { name: "src", type: "string" },
    { name: "alt", type: "string" },
    { name: "style", type: "string" },
    { name: "width", type: "string" },
    { name: "height", type: "string" },
    { name: "class", type: "string" },
    { name: "className", type: "string" },
  ],
  hasChildren: false,
  Editor: GenericJsxEditor,
};

const htmlCatchAllDescriptor: JsxComponentDescriptor = {
  name: "*",
  kind: "flow",
  props: [],
  hasChildren: true,
  Editor: GenericJsxEditor,
};

type MdxEditorInnerProps = {
  markdown: string;
  onChange: (markdown: string) => void;
};

export default function MdxEditorInner({
  markdown,
  onChange,
}: MdxEditorInnerProps) {
  // Transform once per mount (parent remounts via editorKey after load).
  const initialMarkdown = useRef(toEditorMarkdown(markdown)).current;

  return (
    <div className="admin-mdx-editor overflow-hidden rounded-md border bg-background">
      <MDXEditor
        markdown={initialMarkdown}
        onChange={(next) => onChange(fromEditorMarkdown(next))}
        className="min-h-[360px]"
        contentEditableClassName="prose dark:prose-invert max-w-none px-4 py-3 min-h-[320px]"
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          tablePlugin(),
          imagePlugin(),
          jsxPlugin({
            jsxComponentDescriptors: [htmlImgDescriptor, htmlCatchAllDescriptor],
          }),
          codeBlockPlugin({ defaultCodeBlockLanguage: "txt" }),
          codeMirrorPlugin({
            codeBlockLanguages: {
              txt: "Plain Text",
              js: "JavaScript",
              ts: "TypeScript",
              tsx: "TypeScript (React)",
              jsx: "JavaScript (React)",
              css: "CSS",
              html: "HTML",
              json: "JSON",
              bash: "Bash",
              python: "Python",
              stata: "Stata",
              md: "Markdown",
              math: "Math",
            },
          }),
          // Source-first: LaTeX-heavy posts are safer as Markdown source.
          diffSourcePlugin({ viewMode: "source" }),
          toolbarPlugin({
            toolbarContents: () => (
              <DiffSourceToggleWrapper>
                <UndoRedo />
                <Separator />
                <BoldItalicUnderlineToggles />
                <CodeToggle />
                <Separator />
                <BlockTypeSelect />
                <Separator />
                <ListsToggle />
                <Separator />
                <CreateLink />
                <InsertImage />
                <InsertTable />
                <InsertThematicBreak />
                <InsertCodeBlock />
              </DiffSourceToggleWrapper>
            ),
          }),
        ]}
      />
    </div>
  );
}
