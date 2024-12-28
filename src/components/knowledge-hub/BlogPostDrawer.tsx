import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Button,
  Image,
  Spinner,
} from "@nextui-org/react";
import { PanelRightClose, Heart, Eye } from "lucide-react";
import { useTranslations } from "next-intl";
import { ErrorBoundary } from "react-error-boundary";
import { useState, useEffect } from "react";
import { Editor } from "@tiptap/react";

import { BlogPost } from "@/src/interfaces/Hub";
import { TiptapToC } from "@/src/components/hobbiton/TiptapToC";
import { incrementLikes } from "@/actions/prisma/blogPosts/action";

import { BlogPostTags } from "./BlogPostTags";

interface BlogPostMetadataProps {
  post: BlogPost;
  t: (key: string) => string;
}

const BlogPostMetadata = ({ post, t }: BlogPostMetadataProps) => (
  <div className="space-y-2 mb-3">
    <p className="text-sm">
      <span className="text-purple-800 dark:text-purple-300">
        {t("blogPostDrawer.published")}
      </span>
      {post.publishedAt?.toLocaleDateString() || "N/A"}
    </p>
    <p className="text-sm">
      <span className="text-purple-800 dark:text-purple-300">
        {t("blogPostDrawer.updated")}
      </span>
      {post.updatedAt.toLocaleDateString()}
    </p>
    <p className="text-sm">
      <span className="text-purple-800 dark:text-purple-300">
        {t("blogPostDrawer.author")}
      </span>
      {post.author}
    </p>
  </div>
);

const ErrorFallback = () => (
  <div className="p-4 text-red-500">Something went wrong loading the post.</div>
);

interface BlogPostDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  post: BlogPost;
  editor?: Editor;
  tocItems?: any[]; // or your typed items
}

export function BlogPostDrawer({
  isOpen,
  onOpenChange,
  post,
  editor,
  tocItems,
}: BlogPostDrawerProps) {
  const t = useTranslations("knowledge-hub");
  const [isLoading, setIsLoading] = useState(true);
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    if (!isLiked) {
      const updated = await incrementLikes(post.slug);

      if (updated) {
        setLikes(updated.likes);
        setIsLiked(true);
        localStorage.setItem(`liked_${post.slug}`, "true");
      }
    }
  };

  useEffect(() => {
    setIsLiked(localStorage.getItem(`liked_${post.slug}`) === "true");
  }, [post.slug]);

  const handleImageLoad = () => setIsLoading(false);

  return (
    <Drawer
      hideCloseButton
      aria-labelledby="post-drawer-title"
      backdrop="opaque"
      classNames={{
        base: "rounded-lg bg-background border border-purple-800 dark:border-purple-300",
      }}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DrawerContent>
        {(onClose) => (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <DrawerHeader className="flex justify-between items-center">
              <Button
                isIconOnly
                aria-label="Close drawer"
                className="border-purple-800 dark:border-purple-300 hover:dark:border-purple-950 hover:bg-purple-800 hover:dark:bg-purple-950 hover:text-background hover:dark:text-foreground focus:outline-none"
                variant="light"
                onPress={onClose}
              >
                <PanelRightClose />
              </Button>
            </DrawerHeader>
            <DrawerBody className="text-foreground">
              <h1 className="text-2xl font-bold pt-1 pb-3">{post.title}</h1>
              <div className="relative mb-2">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Spinner color="secondary" />
                  </div>
                )}
                <Image
                  alt={`Cover image for ${post.title}`}
                  className="mb-2 object-cover w-full h-60"
                  src={post.coverImage || "/assets/thumbnail-placeholder.webp"}
                  onLoad={handleImageLoad}
                />
              </div>

              {/* Stats buttons */}
              <div className="flex flex-row gap-2 mb-4">
                <Button
                  aria-label="View count"
                  className="bg-background border text-purple-800 dark:text-purple-300 border-purple-800 dark:border-purple-300 min-w-fit px-4"
                  radius="md"
                  variant="bordered"
                >
                  <div className="flex items-center gap-2">
                    <Eye size={20} />
                    <span>{post.views}</span>
                  </div>
                </Button>
                <Button
                  aria-label="Like post"
                  className={`bg-background border min-w-fit px-4 ${
                    isLiked
                      ? "text-red-500 border-red-500"
                      : "text-purple-800 dark:text-purple-300 border-purple-800 dark:border-purple-300"
                  }`}
                  radius="md"
                  variant="bordered"
                  onPress={handleLike}
                >
                  <div className="flex items-center gap-2">
                    <Heart
                      className={isLiked ? "fill-current" : ""}
                      size={20}
                    />
                    <span>{likes}</span>
                  </div>
                </Button>
              </div>

              <h2 className="text-lg font-semibold text-purple-800 dark:text-purple-300 mb-2">
                {t("blogPostDrawer.summary")}
              </h2>
              <p className="text-sm mb-4">{post.summary}</p>
              <TiptapToC editor={editor} items={tocItems} />
              <BlogPostTags className="my-3" tags={post.tags.slice(0, 5)} />
              <BlogPostMetadata post={post} t={t} />
            </DrawerBody>
          </ErrorBoundary>
        )}
      </DrawerContent>
    </Drawer>
  );
}
