"use client";

import type { Editor, JSONContent } from "@tiptap/core";

import { useContext, useState, useMemo, useEffect } from "react";
import { Paperclip } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { NonceContext } from "@/src/app/providers";
import { TiptapEditor } from "@/src/components/hobbiton/TiptapEditor";
import { BLogPostReaderProps } from "@/src/interfaces/Hub";
import BlogPostPageTitle from "@/components/knowledge-hub/BlogPostPageTitle";
import Breadcrumbs from "@/src/components/root/Breadcrumbs";
import { BlogPostDrawer } from "@/components/knowledge-hub/BlogPostDrawer";
import { incrementViews } from "@/actions/prisma/blogPosts/action";

export const BlogPostReader = ({ post }: BLogPostReaderProps) => {
  const nonce = useContext(NonceContext);
  const [isOpen, setIsOpen] = useState(false);
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
      <div
        className="mt-10 w-full px-2 md:px-0 md:max-w-5xl mx-auto"
        nonce={nonce}
      >
        <Breadcrumbs />
      </div>
      <Card className="bg-background w-full px-2 md:px-0 md:max-w-5xl mx-auto border-0">
        <CardContent className="w-full mx-auto" nonce={nonce}>
          <TiptapEditor
            content={parsedContent}
            editable={false}
            onEditorReady={handleEditorReady}
            onTocItemsUpdate={handleTocItemsUpdate}
          />
        </CardContent>
      </Card>
      <Button
        className="fixed top-24 right-2 md:right-8 z-50 shadow-md rounded-md"
        nonce={nonce}
        size="icon"
        variant="form"
        onClick={() => setIsOpen(true)}
      >
        <Paperclip className="h-4 w-4" />
      </Button>
      <BlogPostDrawer
        editor={editor}
        isOpen={isOpen}
        post={post}
        tocItems={tocItems}
        onOpenChange={setIsOpen}
      />
    </>
  );
};
