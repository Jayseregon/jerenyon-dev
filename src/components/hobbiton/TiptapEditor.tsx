"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

interface EditorProps {
  content: string;
  setContent: (content: string) => void;
}

export const TiptapEditor = ({ content, setContent }: EditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
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

  return <EditorContent editor={editor} />;
};
