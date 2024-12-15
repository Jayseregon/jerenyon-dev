import React from "react";
import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Undo,
  Redo,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignJustify,
  AlignRight,
  Quote,
} from "lucide-react";

const MenuButton = ({
  onClick,
  isActive,
  disabled,
  children,
}: {
  onClick: () => void;
  isActive: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}) => (
  <button
    className={`p-2 ${isActive ? "bg-violet-500 text-white rounded-md" : ""}`}
    disabled={disabled}
    type="button"
    onClick={onClick}
  >
    {children}
  </button>
);

export const TiptapMenuBar = ({ editor }: { editor: Editor }) => {
  if (!editor) return null;

  const textEditButtonsList = [
    {
      icon: <Bold className="w-4 h-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
    },
    {
      icon: <Underline className="w-4 h-4" />,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      isActive: editor.isActive("underline"),
    },
    {
      icon: <Italic className="w-4 h-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
      disabled: !editor.can().chain().focus().toggleItalic().run(),
    },
    {
      icon: <Strikethrough className="w-4 h-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive("strike"),
      disabled: !editor.can().chain().focus().toggleStrike().run(),
    },
    {
      icon: <Code className="w-4 h-4" />,
      onClick: () => editor.chain().focus().toggleCode().run(),
      isActive: editor.isActive("code"),
      disabled: !editor.can().chain().focus().toggleCode().run(),
    },
    {
      icon: <Quote className="w-4 h-4" />,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive("blockquote"),
    },
    {
      icon: <AlignLeft className="w-4 h-4" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      isActive: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <AlignCenter className="w-4 h-4" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      isActive: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <AlignRight className="w-4 h-4" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      isActive: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <AlignJustify className="w-4 h-4" />,
      onClick: () => editor.chain().focus().setTextAlign("justify").run(),
      isActive: editor.isActive({ textAlign: "justify" }),
    },
    {
      icon: <List className="w-4 h-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className="w-4 h-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
      disabled: !editor.can().chain().focus().toggleOrderedList().run(),
    },
    {
      icon: <Undo className="w-4 h-4" />,
      onClick: () => editor.chain().focus().undo().run(),
      isActive: false,
      disabled: !editor.can().chain().focus().undo().run(),
    },
    {
      icon: <Redo className="w-4 h-4" />,
      onClick: () => editor.chain().focus().redo().run(),
      isActive: false,
      disabled: !editor.can().chain().focus().redo().run(),
    },
  ];

  const headerButtons = [1, 2, 3, 4, 5, 6].map((level) => ({
    icon: `H${level}`,
    onClick: () => {
      editor
        .chain()
        .focus()
        .toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 })
        .run();
    },
    isActive: editor.isActive("heading", { level }),
  }));

  return (
    <div className="flex flex-col my-2">
      <div className="flex space-x-2">
        {textEditButtonsList.map(
          ({ icon, onClick, isActive, disabled }, index) => (
            <MenuButton
              key={index}
              disabled={disabled}
              isActive={isActive}
              onClick={onClick}
            >
              {icon}
            </MenuButton>
          ),
        )}
      </div>
      <div className="flex space-x-2">
        {headerButtons.map(({ icon, onClick, isActive }, index) => (
          <MenuButton
            key={`header-${index}`}
            isActive={isActive}
            onClick={onClick}
          >
            {icon}
          </MenuButton>
        ))}
      </div>
    </div>
  );
};
