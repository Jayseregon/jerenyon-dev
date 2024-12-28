"use client";

import type { Editor, JSONContent } from "@tiptap/core";

import { Card, useDisclosure, Button } from "@nextui-org/react";
import { useContext, useState, useMemo, useEffect } from "react";
import { Paperclip } from "lucide-react";

import { NonceContext } from "@/src/app/providers";
import { TiptapEditor } from "@/src/components/hobbiton/TiptapEditor";
import { BLogPostReaderProps } from "@/src/interfaces/Hub";
import BlogPostPageTitle from "@/components/knowledge-hub/BlogPostPageTitle";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { BlogPostDrawer } from "@/components/knowledge-hub/BlogPostDrawer";
import { incrementViews } from "@/actions/prisma/blogPosts/action";

export const BlogPostReader = ({ post }: BLogPostReaderProps) => {
  const nonce = useContext(NonceContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editor, setEditor] = useState<Editor | undefined>();
  const [tocItems, setTocItems] = useState<any[]>([]);

  // Memoize parsed JSON so TiptapEditor always
  // sees the same reference and doesn't re-init infinitely.
  const parsedContent = useMemo(
    () => JSON.parse(post.content) as JSONContent,
    [post.content],
  );

  const handleEditorReady = (instance: Editor) => {
    // Only set editor if not previously set, preventing infinite re-renders
    setEditor((prev) => (prev ? prev : instance));
  };

  const handleTocItemsUpdate = (items: any[]) => {
    setTocItems(items);
  };

  useEffect(() => {
    const viewKey = `view_${post.slug}`;
    const lastView = localStorage.getItem(viewKey);
    const now = new Date().getTime();

    // Only count view if last view was more than 1 hour ago or never
    if (!lastView || now - parseInt(lastView) > 3600000) {
      incrementViews(post.slug);
      localStorage.setItem(viewKey, now.toString());
    }
  }, [post.slug]);

  return (
    <>
      <BlogPostPageTitle title={post.title} />
      <div className="mt-10 max-w-5xl mx-auto">
        <Breadcrumbs />
      </div>
      <Card
        className="bg-background rounded-lg max-w-5xl mx-auto"
        nonce={nonce}
      >
        <div className="w-full mx-auto">
          <TiptapEditor
            content={parsedContent}
            editable={false}
            onEditorReady={handleEditorReady}
            onTocItemsUpdate={handleTocItemsUpdate}
          />
        </div>
      </Card>
      <Button
        isIconOnly
        className="fixed top-24 right-8 z-50 shadow-md bg-background text-foreground border border-purple-800 dark:border-purple-300 hover:dark:border-purple-950 hover:bg-purple-800 hover:dark:bg-purple-950 hover:text-background hover:dark:text-foreground focus:outline-none"
        variant="bordered"
        onPress={onOpen}
      >
        <Paperclip />
      </Button>
      <BlogPostDrawer
        editor={editor}
        isOpen={isOpen}
        post={post}
        tocItems={tocItems}
        onOpenChange={onOpenChange}
      />
    </>
  );
};
