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
import { Editor, JSONContent } from "@tiptap/core";
import { all, createLowlight } from "lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import {
  getHierarchicalIndexes,
  TableOfContents,
} from "@tiptap-pro/extension-table-of-contents";

import { TiptapMenuBar } from "./TiptapMenuBar";

interface EditorProps {
  content: JSONContent | undefined;
  setContent?: (content: JSONContent | undefined) => void;
  initialContent?: JSONContent;
  editable?: boolean;
  onEditorReady?: (editor: Editor) => void;
  onTocItemsUpdate?: (items: any[]) => void;
}

const lowlight = createLowlight(all);

export const TiptapEditor = ({
  content,
  setContent,
  initialContent,
  editable = true,
  onEditorReady,
  onTocItemsUpdate,
}: EditorProps) => {
  // const [tocItems, setTocItems] = useState<any[]>([]); // store TOC items

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
      TableOfContents.configure({
        getIndex: getHierarchicalIndexes,
        onUpdate(newItems) {
          // setTocItems(newItems);
          onTocItemsUpdate?.(newItems);
        },
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
    if (editor) {
      onEditorReady?.(editor);
    }
  }, [editor, onEditorReady]);

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
    <>
      {editable && editor && <TiptapMenuBar editor={editor} />}
      <div className="rounded-lg border border-purple-800 dark:border-purple-300 shadow-lg">
        {editor && <EditorContent editor={editor} />}
      </div>
    </>
  );
};
