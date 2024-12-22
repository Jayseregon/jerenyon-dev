"use client";

import { Card, useDisclosure, Button } from "@nextui-org/react";
import { useContext } from "react";
import { Paperclip } from "lucide-react";

import { NonceContext } from "@/src/app/providers";
import { TiptapEditor } from "@/src/components/hobbiton/TiptapEditor";
import { BLogPostReaderProps } from "@/src/interfaces/Hub";
import BlogPostPageTitle from "@/components/knowledge-hub/BlogPostPageTitle";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { BlogPostDrawer } from "@/components/knowledge-hub/BlogPostDrawer";

export const BlogPostReader = ({ post }: BLogPostReaderProps) => {
  const nonce = useContext(NonceContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
          <TiptapEditor content={JSON.parse(post.content)} editable={false} />
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
      <BlogPostDrawer isOpen={isOpen} post={post} onOpenChange={onOpenChange} />
    </>
  );
};
