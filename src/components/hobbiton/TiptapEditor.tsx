"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useEffect } from "react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import CodeBlock from "@tiptap/extension-code-block";
import Blockquote from "@tiptap/extension-blockquote";
import HardBreak from "@tiptap/extension-hard-break";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import History from "@tiptap/extension-history";
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

import { TiptapMenuBar } from "./TiptapMenuBar";

interface EditorProps {
  content: string;
  setContent: (content: string) => void;
}

export const TiptapEditor = ({ content, setContent }: EditorProps) => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph.configure({
        HTMLAttributes: {
          class: "",
        },
      }),
      Text,
      Heading,
      Bold,
      Italic,
      Strike,
      Code,
      CodeBlock,
      Blockquote,
      HardBreak,
      HorizontalRule,
      ListItem,
      BulletList,
      OrderedList,
      History,
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
    ],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-darkTheme prose-sm sm:prose-base max-w-none min-h-[300px] focus:outline-none px-4 py-2",
      },
    },
    // Default styling when editor is empty
    editable: true,
    parseOptions: {
      preserveWhitespace: "full",
    },
    immediatelyRender: false, // fix SSR hydration issues
  });

  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  return (
    <div>
      {editor && <TiptapMenuBar editor={editor} />}
      <div className="mb-4 rounded-lg border border-purple-800 dark:border-purple-300">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
