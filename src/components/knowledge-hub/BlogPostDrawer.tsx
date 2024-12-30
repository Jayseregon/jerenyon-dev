import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Button,
  Image,
  Spinner,
} from "@nextui-org/react";
import { PanelRightClose, Heart, Eye, Share2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { ErrorBoundary } from "react-error-boundary";
import { useState, useEffect, useContext } from "react";

import {
  BlogPostDrawerProps,
  BlogPostMetadataProps,
} from "@/src/interfaces/Hub";
import { TiptapToC } from "@/src/components/hobbiton/TiptapToC";
import { incrementLikes } from "@/actions/prisma/blogPosts/action";
import { NonceContext } from "@/src/app/providers";
import { LinkedInIcon } from "@/components/icons";

import { BlogPostTags } from "./BlogPostTags";

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

  const handleShare = async () => {
    const url = `${window.location.origin}/knowledge-hub/${post.slug}`;
    const title = post.title;
    const text = post.summary;

    if (navigator.share) {
      try {
        await navigator.share({ url, title, text });
      } catch (error) {
        // Ignore AbortError as it's just a user cancellation
        if (!(error instanceof Error && error.name === "AbortError")) {
          console.error("Error sharing post: ", error);
        }
      }
    }
  };

  return (
    <Drawer
      hideCloseButton
      aria-labelledby="post-drawer-title"
      backdrop="opaque"
      classNames={{
        base: "rounded-lg bg-background border border-purple-800 dark:border-purple-300",
      }}
      isOpen={isOpen}
      nonce={nonce}
      onOpenChange={onOpenChange}
    >
      <DrawerContent>
        {(onClose) => (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <DrawerHeader
              className="flex justify-between items-center"
              nonce={nonce}
            >
              <Button
                isIconOnly
                aria-label="Close drawer"
                className="border-purple-800 dark:border-purple-300 hover:dark:border-purple-950 hover:bg-purple-800 hover:dark:bg-purple-950 hover:text-background hover:dark:text-foreground focus:outline-none"
                nonce={nonce}
                variant="light"
                onPress={onClose}
              >
                <PanelRightClose />
              </Button>
            </DrawerHeader>
            <DrawerBody className="text-foreground" nonce={nonce}>
              <h1 className="text-2xl font-bold pt-1 pb-3" nonce={nonce}>
                {post.title}
              </h1>
              <div className="relative mb-2" nonce={nonce}>
                {isLoading && (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    nonce={nonce}
                  >
                    <Spinner color="secondary" nonce={nonce} />
                  </div>
                )}
                <Image
                  alt={`Cover image for ${post.title}`}
                  className="mb-2 object-cover w-full h-60"
                  nonce={nonce}
                  src={post.coverImage || "/assets/thumbnail-placeholder.webp"}
                  onLoad={handleImageLoad}
                />
              </div>

              {/* Stats buttons */}
              <div className="flex flex-row gap-2 mb-4" nonce={nonce}>
                {/* Views count button */}
                <Button
                  aria-label="View count"
                  className="bg-background border text-purple-800 dark:text-purple-300 border-purple-800 dark:border-purple-300 min-w-fit px-4"
                  nonce={nonce}
                  radius="md"
                  variant="bordered"
                >
                  <div className="flex items-center gap-2" nonce={nonce}>
                    <Eye size={20} />
                    <span>{post.views}</span>
                  </div>
                </Button>
                {/* Like button */}
                <Button
                  aria-label="Like post"
                  className={`bg-background border min-w-fit px-4 ${
                    isLiked
                      ? "text-red-500 border-red-500"
                      : "text-purple-800 dark:text-purple-300 border-purple-800 dark:border-purple-300"
                  }`}
                  nonce={nonce}
                  radius="md"
                  variant="bordered"
                  onPress={handleLike}
                >
                  <div className="flex items-center gap-2" nonce={nonce}>
                    <Heart
                      className={isLiked ? "fill-current" : ""}
                      size={20}
                    />
                    <span>{likes}</span>
                  </div>
                </Button>
                {/* LinkedIn share button */}
                <Button
                  aria-label="Share on LinkedIn"
                  as="a"
                  className="bg-background border text-purple-800 dark:text-purple-300 border-purple-800 dark:border-purple-300 min-w-fit px-4"
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    typeof window !== "undefined" ? window.location.href : "",
                  )}`}
                  nonce={nonce}
                  radius="md"
                  rel="noopener noreferrer"
                  target="_blank"
                  variant="bordered"
                >
                  <LinkedInIcon size={20} />
                </Button>
                {/* Share button */}
                <Button
                  aria-label="Share post"
                  className="bg-background border text-purple-800 dark:text-purple-300 border-purple-800 dark:border-purple-300 min-w-fit px-4"
                  nonce={nonce}
                  radius="md"
                  variant="bordered"
                  onPress={handleShare}
                >
                  <div className="flex items-center gap-2" nonce={nonce}>
                    <Share2 size={20} />
                  </div>
                </Button>
              </div>

              <h2
                className="text-lg font-semibold text-purple-800 dark:text-purple-300 mb-2"
                nonce={nonce}
              >
                {t("blogPostDrawer.summary")}
              </h2>
              <p className="text-sm mb-4" nonce={nonce}>
                {post.summary}
              </p>
              <TiptapToC editor={editor} items={tocItems} />
              <BlogPostTags className="my-3" tags={post.tags.slice(0, 5)} />
              <BlogPostMetadata nonce={nonce} post={post} t={t} />
            </DrawerBody>
          </ErrorBoundary>
        )}
      </DrawerContent>
    </Drawer>
  );
}
