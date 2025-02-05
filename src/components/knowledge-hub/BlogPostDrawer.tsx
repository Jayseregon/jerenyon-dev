"use client";

import { Heart, Eye } from "lucide-react";
import { useTranslations } from "next-intl";
import { ErrorBoundary } from "react-error-boundary";
import { useState, useEffect, useContext } from "react";
import { BlogPostCategory } from "@prisma/client";
import Image from "next/image";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BlogPostDrawerProps,
  BlogPostMetadataProps,
  PostTypes,
} from "@/src/interfaces/Hub";
import { TiptapToC } from "@/src/components/hobbiton/TiptapToC";
import { incrementLikes } from "@/actions/prisma/blogPosts/action";
import { NonceContext } from "@/src/app/providers";
import { sendLikeNotification } from "@/src/actions/resend/action";

import { BlogPostTags } from "./BlogPostTags";
import { ShareButton } from "./ShareButton";

const BlogPostMetadata = ({ post, t, nonce }: BlogPostMetadataProps) => (
  <div className="space-y-2 mb-3" nonce={nonce}>
    <p className="text-sm" nonce={nonce}>
      <span className="text-purple-800 dark:text-purple-300" nonce={nonce}>
        {t("blogPostDrawer.published")}
      </span>
      {post.publishedAt?.toLocaleDateString() || "N/A"}
    </p>
    <p className="text-sm" nonce={nonce}>
      <span className="text-purple-800 dark:text-purple-300" nonce={nonce}>
        {t("blogPostDrawer.updated")}
      </span>
      {post.updatedAt.toLocaleDateString()}
    </p>
    <p className="text-sm" nonce={nonce}>
      <span className="text-purple-800 dark:text-purple-300" nonce={nonce}>
        {t("blogPostDrawer.author")}
      </span>
      {post.author}
    </p>
  </div>
);

const ErrorFallback = () => (
  <div className="p-4 text-red-500">Something went wrong loading the post.</div>
);

const categoryToPathMap: Record<BlogPostCategory, PostTypes> = {
  ARTICLE: "articles-and-tutorials",
  PROJECT: "projects-showcase",
};

export function BlogPostDrawer({
  isOpen,
  onOpenChange,
  post,
  editor,
  tocItems,
}: BlogPostDrawerProps) {
  const nonce = useContext(NonceContext);
  const t = useTranslations("knowledge-hub");
  const [isLoading, setIsLoading] = useState(true);
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    const categoryPath = categoryToPathMap[post.category];
    const baseUrl = window.location.origin;

    setShareUrl(`${baseUrl}/knowledge-hub/${categoryPath}/${post.slug}`);
  }, [post.category, post.slug]);

  const handleLike = async () => {
    if (!isLiked) {
      const updated = await incrementLikes(post.slug);

      if (updated) {
        setLikes(updated.likes);
        setIsLiked(true);
        localStorage.setItem(`liked_${post.slug}`, "true");
        const { success } = await sendLikeNotification(post.slug);

        if (!success) {
          console.error("Failed to send like notification");
        }
      }
    }
  };

  useEffect(() => {
    setIsLiked(localStorage.getItem(`liked_${post.slug}`) === "true");
  }, [post.slug]);

  const handleImageLoad = () => setIsLoading(false);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        className="w-full max-w-xl md:max-w-2xl border-l border-purple-800 dark:border-purple-300 overflow-y-auto"
        side="right"
      >
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <SheetHeader className="flex justify-between items-center pb-2">
            <SheetTitle className="text-2xl font-bold">{post.title}</SheetTitle>
          </SheetHeader>

          <div className="space-y-4 py-4">
            <div className="relative h-60 w-full flex items-center justify-center">
              {isLoading && <Skeleton className="absolute inset-0" />}
              <Image
                alt={`Cover image for ${post.title}`}
                className="object-contain w-full h-60 rounded-md"
                height={0}
                nonce={nonce}
                sizes="100vw"
                src={post.coverImage || "/assets/thumbnail-placeholder.webp"}
                style={{ width: "auto", height: "100%" }}
                width={0}
                onLoad={handleImageLoad}
              />
            </div>

            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-2">
                <Button variant="ghost">
                  <Eye className="h-5 w-5" />
                  <span>{post.views}</span>
                </Button>

                <Button
                  className={` ${isLiked ? "text-red-500" : ""}`}
                  variant="ghost"
                  onClick={handleLike}
                >
                  <Heart
                    className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`}
                  />
                  <span>{likes}</span>
                </Button>
              </div>
              <ShareButton
                nonce={nonce}
                summary={post.summary}
                title={post.title}
                url={shareUrl}
              />
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-purple-800 dark:text-purple-300">
                {t("blogPostDrawer.summary")}
              </h2>
              <SheetDescription asChild>
                <p className="text-sm">{post.summary}</p>
              </SheetDescription>
            </div>

            <TiptapToC editor={editor} items={tocItems} />
            <BlogPostTags className="my-3" tags={post.tags} />
            <BlogPostMetadata nonce={nonce} post={post} t={t} />
          </div>
        </ErrorBoundary>
      </SheetContent>
    </Sheet>
  );
}
