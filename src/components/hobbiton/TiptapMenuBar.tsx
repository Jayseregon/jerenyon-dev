import React, { useState } from "react";
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
  Pilcrow,
  ListOrdered,
  List,
} from "lucide-react";
import { Editor } from "@tiptap/react";

export const TiptapMenuBar = ({ editor }: { editor: Editor }) => {
  const [imageUrl, setImageUrl] = useState("");

  if (!editor) {
    return null;
  }

  const buttonClass =
    "border border-purple-800 dark:border-purple-300 p-1 rounded text-sm";

  const getButtonClass = (isActive: boolean) =>
    `border border-purple-800 dark:border-purple-300 p-1 rounded text-sm ${
      isActive ? "bg-purple-800 dark:bg-purple-300 text-background" : ""
    }`;

  const insertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run();
  };

  const addImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl("");
    }
  };

  return (
    <div className="flex flex-row flex-wrap space-x-1 space-y-1">
      <button
        className={getButtonClass(editor.isActive("paragraph"))}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setParagraph().run();
        }}
      >
        <Pilcrow className="w-4 h-4" />
      </button>
      <button
        className={getButtonClass(editor.isActive("bold"))}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBold().run();
        }}
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        className={getButtonClass(editor.isActive("italic"))}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleItalic().run();
        }}
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        className={getButtonClass(editor.isActive("strike"))}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleStrike().run();
        }}
      >
        <Strikethrough className="w-4 h-4" />
      </button>
      <button
        className={getButtonClass(editor.isActive("code"))}
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
        className={getButtonClass(editor.isActive({ textAlign: "left" }))}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      >
        <AlignLeft className="w-4 h-4" />
      </button>
      <button
        className={getButtonClass(editor.isActive({ textAlign: "center" }))}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        <AlignCenter className="w-4 h-4" />
      </button>
      <button
        className={getButtonClass(editor.isActive({ textAlign: "right" }))}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        <AlignRight className="w-4 h-4" />
      </button>
      <button
        className={getButtonClass(editor.isActive({ textAlign: "justify" }))}
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
      >
        <AlignJustify className="w-4 h-4" />
      </button>
      {[1, 2, 3, 4, 5, 6].map((level) => (
        <button
          key={level}
          className={getButtonClass(editor.isActive("heading", { level }))}
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
        className={getButtonClass(editor.isActive("bulletList"))}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBulletList().run();
        }}
      >
        <List className="w-4 h-4" />
      </button>
      <button
        className={getButtonClass(editor.isActive("orderedList"))}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleOrderedList().run();
        }}
      >
        <ListOrdered className="w-4 h-4" />
      </button>
      <button
        className={getButtonClass(editor.isActive("codeBlock"))}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleCodeBlock().run();
        }}
      >
        Code block
      </button>
      <button
        className={getButtonClass(editor.isActive("blockquote"))}
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
        className={getButtonClass(editor.isActive("link"))}
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
        className={getButtonClass(editor.isActive("highlight"))}
        onClick={() => editor.chain().focus().toggleHighlight().run()}
      >
        <Highlighter className="w-4 h-4" />
      </button>
      <button
        className={getButtonClass(editor.isActive("subscript"))}
        onClick={() => editor.chain().focus().toggleSubscript().run()}
      >
        <SubscriptIcon className="w-4 h-4" />
      </button>
      <button
        className={getButtonClass(editor.isActive("superscript"))}
        onClick={() => editor.chain().focus().toggleSuperscript().run()}
      >
        <SuperscriptIcon className="w-4 h-4" />
      </button>
      <button
        className={getButtonClass(editor.isActive("table"))}
        onClick={insertTable}
      >
        <TableIcon className="w-4 h-4" />
      </button>
      <button className={buttonClass} onClick={addImage}>
        <ImageIcon className="w-4 h-4" />
      </button>
      <input
        className="border border-purple-800 dark:border-purple-300 p-1 rounded text-sm"
        placeholder="Enter image URL"
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
    </div>
  );
};
