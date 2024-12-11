import React from "react";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link2,
  Highlighter,
  Subscript as SubscriptIcon,
  Superscript as SuperscriptIcon,
  Table as TableIcon,
  Image as ImageIcon,
} from "lucide-react";
import { Editor } from "@tiptap/react";

export const TiptapMenuBar = ({ editor }: { editor: Editor }) => {
  if (!editor) {
    return null;
  }

  const buttonClass =
    "border border-purple-800 dark:border-purple-300 p-1 rounded text-sm";

  const insertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run();
  };

  const addImage = () => {
    const url = window.prompt("Enter image URL:");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="flex flex-row flex-wrap space-x-1">
      <button
        className={`${editor.isActive("bold") ? "bg-purple-800 dark:bg-purple-300" : ""} ${buttonClass}`}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBold().run();
        }}
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        className={`${editor.isActive("italic") ? "bg-purple-800 dark:bg-purple-300" : ""} ${buttonClass}`}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleItalic().run();
        }}
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        className={`${editor.isActive("strike") ? "bg-purple-800 dark:bg-purple-300" : ""} ${buttonClass}`}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleStrike().run();
        }}
      >
        <Strikethrough className="w-4 h-4" />
      </button>
      <button
        className={`${editor.isActive("code") ? "bg-purple-800 dark:bg-purple-300" : ""} ${buttonClass}`}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleCode().run();
        }}
      >
        <Code className="w-4 h-4" />
      </button>
      <button
        className={buttonClass}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().unsetAllMarks().run();
        }}
      >
        Clear marks
      </button>
      <button
        className={buttonClass}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().clearNodes().run();
        }}
      >
        Clear nodes
      </button>
      <button
        className={`${editor.isActive("paragraph") ? "bg-purple-800 dark:bg-purple-300" : ""} ${buttonClass}`}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setParagraph().run();
        }}
      >
        Paragraph
      </button>
      <button
        className={`${editor.isActive({ textAlign: "left" }) ? "bg-purple-800 dark:bg-purple-300" : ""} ${buttonClass}`}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      >
        <AlignLeft className="w-4 h-4" />
      </button>
      <button
        className={`${editor.isActive({ textAlign: "center" }) ? "bg-purple-800 dark:bg-purple-300" : ""} ${buttonClass}`}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        <AlignCenter className="w-4 h-4" />
      </button>
      <button
        className={`${editor.isActive({ textAlign: "right" }) ? "bg-purple-800 dark:bg-purple-300" : ""} ${buttonClass}`}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        <AlignRight className="w-4 h-4" />
      </button>
      <button
        className={`${editor.isActive({ textAlign: "justify" }) ? "bg-purple-800 dark:bg-purple-300" : ""} ${buttonClass}`}
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
      >
        <AlignJustify className="w-4 h-4" />
      </button>
      {[1, 2, 3, 4, 5, 6].map((level) => (
        <button
          key={level}
          className={`${editor.isActive("heading", { level }) ? "bg-purple-800 dark:bg-purple-300" : ""} ${buttonClass}`}
          onClick={(e) => {
            e.preventDefault();
            editor
              .chain()
              .focus()
              .toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 })
              .run();
          }}
        >
          H{level}
        </button>
      ))}
      <button
        className={`${editor.isActive("bulletList") ? "bg-purple-800 dark:bg-purple-300" : ""} ${buttonClass}`}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBulletList().run();
        }}
      >
        Bullet list
      </button>
      <button
        className={`${editor.isActive("orderedList") ? "bg-purple-800 dark:bg-purple-300" : ""} ${buttonClass}`}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleOrderedList().run();
        }}
      >
        Ordered list
      </button>
      <button
        className={`${editor.isActive("codeBlock") ? "bg-purple-800 dark:bg-purple-300" : ""} ${buttonClass}`}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleCodeBlock().run();
        }}
      >
        Code block
      </button>
      <button
        className={`${editor.isActive("blockquote") ? "bg-purple-800 dark:bg-purple-300" : ""} ${buttonClass}`}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBlockquote().run();
        }}
      >
        Blockquote
      </button>
      <button
        className={buttonClass}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setHorizontalRule().run();
        }}
      >
        Horizontal rule
      </button>
      <button
        className={buttonClass}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setHardBreak().run();
        }}
      >
        Hard break
      </button>
      <button
        className={buttonClass}
        disabled={!editor.can().chain().focus().undo().run()}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().undo().run();
        }}
      >
        <Undo className="w-4 h-4" />
      </button>
      <button
        className={buttonClass}
        disabled={!editor.can().chain().focus().redo().run()}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().redo().run();
        }}
      >
        <Redo className="w-4 h-4" />
      </button>
      <button
        className={`${editor.isActive("link") ? "bg-purple-800 dark:bg-purple-300" : ""} ${buttonClass}`}
        onClick={() => {
          const url = window.prompt("Enter URL:");

          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
      >
        <Link2 className="w-4 h-4" />
      </button>
      <button
        className={`${editor.isActive("highlight") ? "bg-purple-800 dark:bg-purple-300" : ""} ${buttonClass}`}
        onClick={() => editor.chain().focus().toggleHighlight().run()}
      >
        <Highlighter className="w-4 h-4" />
      </button>
      <button
        className={`${editor.isActive("subscript") ? "bg-purple-800 dark:bg-purple-300" : ""} ${buttonClass}`}
        onClick={() => editor.chain().focus().toggleSubscript().run()}
      >
        <SubscriptIcon className="w-4 h-4" />
      </button>
      <button
        className={`${editor.isActive("superscript") ? "bg-purple-800 dark:bg-purple-300" : ""} ${buttonClass}`}
        onClick={() => editor.chain().focus().toggleSuperscript().run()}
      >
        <SuperscriptIcon className="w-4 h-4" />
      </button>
      <button
        className={`${editor.isActive("table") ? "bg-purple-800 dark:bg-purple-300" : ""} ${buttonClass}`}
        onClick={insertTable}
      >
        <TableIcon className="w-4 h-4" />
      </button>
      <button className={buttonClass} onClick={addImage}>
        <ImageIcon className="w-4 h-4" />
      </button>
    </div>
  );
};
