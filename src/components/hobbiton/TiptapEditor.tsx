"use client";

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import { useContext, useEffect } from "react";
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
import { all, createLowlight } from "lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import {
  getHierarchicalIndexes,
  TableOfContents,
} from "@tiptap-pro/extension-table-of-contents";
import FileHandler from "@tiptap-pro/extension-file-handler";
import Dropcursor from "@tiptap/extension-dropcursor";
import CodeExtension from "@tiptap/extension-code";

import {
  uploadImageToBunny,
  deleteImageFromBunny,
} from "@/actions/bunny/action";
import { EditorProps } from "@/src/interfaces/Hub";
import { extractImages } from "@/src/lib/editorHelpers";
import { NonceContext } from "@/src/app/providers";

import { TiptapMenuBar } from "./TiptapMenuBar";

const lowlight = createLowlight(all);

export const TiptapEditor = ({
  content,
  setContent,
  initialContent,
  editable = true,
  onEditorReady,
  onTocItemsUpdate,
}: EditorProps) => {
  const nonce = useContext(NonceContext);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        code: false,
        codeBlock: false,
        dropcursor: false,
      }),
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
          nonce: { nonce },
          class: `max-w-full p-4 rounded-lg ${editable ? "border border-red-500" : ""}`,
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
      FileHandler.configure({
        allowedMimeTypes: ["image/png", "image/jpeg", "image/webp"],
        onDrop: async (currentEditor, files, pos) => {
          for (const file of files) {
            const fileBuffer = await file.arrayBuffer();
            const bunnyUrl = await uploadImageToBunny(fileBuffer, file.name);

            currentEditor
              .chain()
              .focus()
              .insertContentAt(pos, {
                type: "image",
                attrs: { src: bunnyUrl },
              })
              .run();
          }
        },
      }),
      Dropcursor.configure({}),
      CodeExtension,
    ],
    content: initialContent || content,
    onUpdate: ({ editor }) => {
      setContent?.(editor.getJSON());
    },
    editable: editable,
    editorProps: {
      attributes: {
        spellcheck: "true",
        class: `prose dark:prose-invert max-w-none min-h-[300px] focus:outline-none ProseMirror`,
        style: "white-space: pre-wrap; text-align: left;",
      },
    },
    immediatelyRender: false, // fix SSR hydration issues
    shouldRerenderOnTransaction: true,
  });

  useEffect(() => {
    if (!editor) return;
    // Keep initial reference of images
    let oldImages = extractImages(initialContent || content);

    // Attach a single update listener
    editor.on("update", () => {
      const newImages = extractImages(editor.getJSON());
      const removed = oldImages.filter((src) => !newImages.includes(src));

      removed.forEach(async (imgUrl) => {
        // Adjust for “blog-post/” folder if needed
        const fileName = imgUrl.split("/").pop() || "";

        await deleteImageFromBunny(fileName);
      });

      oldImages = newImages;
    });

    // Call onEditorReady once
    onEditorReady?.(editor);

    // Cleanup event listener & destroy editor
    return () => {
      editor.off("update");
      editor.destroy();
    };
  }, [editor]);

  useEffect(() => {
    if (editor && content) {
      const current = editor.getJSON();

      if (JSON.stringify(current) !== JSON.stringify(content)) {
        editor.commands.setContent(content);
      }
    }
  }, [editor, content]);

  return (
    <>
      {editable && editor && <TiptapMenuBar editor={editor} nonce={nonce} />}
      {editable && editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <TiptapMenuBar isBubbleMenu editor={editor} nonce={nonce} />
        </BubbleMenu>
      )}
      <div
        className="rounded-lg p-5 border border-purple-800 dark:border-purple-300 shadow-lg"
        nonce={nonce}
      >
        {editor && <EditorContent editor={editor} nonce={nonce} />}
      </div>
    </>
  );
};
