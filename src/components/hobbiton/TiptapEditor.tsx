"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useEffect } from "react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Image from "@tiptap/extension-image";
import { JSONContent } from "@tiptap/core";
import { all, createLowlight } from "lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";

import { TiptapMenuBar } from "./TiptapMenuBar";

interface EditorProps {
  content: JSONContent | undefined;
  setContent?: (content: JSONContent | undefined) => void;
  initialContent?: JSONContent;
  editable?: boolean;
}

const lowlight = createLowlight(all);

export const TiptapEditor = ({
  content,
  setContent,
  initialContent,
  editable = true,
}: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Color,
      TextStyle,
      Typography,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        defaultAlignment: "left",
        alignments: ["left", "center", "right", "justify"],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "cursor-pointer",
        },
      }),
      Placeholder.configure({
        placeholder: "Write something...",
      }),
      Highlight,
      Subscript,
      Superscript,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full rounded-lg",
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: "python",
      }),
    ],
    content: initialContent || content,
    onUpdate: ({ editor }) => {
      setContent?.(editor.getJSON());
    },
    editable: editable,
    editorProps: {
      attributes: {
        class: `prose prose-lightTheme dark:prose-darkTheme max-w-none min-h-[300px] focus:outline-none p-10`,
        style: "text-align: left;",
      },
    },
    immediatelyRender: false, // fix SSR hydration issues
  });

  useEffect(() => {
    if (editor && content) {
      const current = editor.getJSON();

      if (JSON.stringify(current) !== JSON.stringify(content)) {
        editor.commands.setContent(content);
      }
    }
  }, [editor, content]);

  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  return (
    <div>
      {editable && editor && <TiptapMenuBar editor={editor} />}
      <div className="rounded-lg border border-purple-800 dark:border-purple-300 shadow-lg">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
