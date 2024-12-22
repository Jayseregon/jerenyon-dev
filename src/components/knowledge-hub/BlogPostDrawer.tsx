import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Button,
  Image,
  Spinner,
} from "@nextui-org/react";
import { PanelRightClose } from "lucide-react";
import { useTranslations } from "next-intl";
import { ErrorBoundary } from "react-error-boundary";
import { useState } from "react";

import { BlogPost } from "@/src/interfaces/Hub";

interface BlogPostMetadataProps {
  post: BlogPost;
  t: (key: string) => string;
}

const BlogPostMetadata = ({ post, t }: BlogPostMetadataProps) => (
  <div className="space-y-2">
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
}

export function BlogPostDrawer({
  isOpen,
  onOpenChange,
  post,
}: BlogPostDrawerProps) {
  const t = useTranslations("knowledge-hub");
  const [isLoading, setIsLoading] = useState(true);

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
              <div className="relative">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Spinner color="secondary" />
                  </div>
                )}
                <Image
                  alt={`Cover image for ${post.title}`}
                  className="mb-4 object-cover w-full h-60"
                  src="/assets/thumbnail-placeholder.webp"
                  onLoad={handleImageLoad}
                />
              </div>
              <h2 className="text-lg font-semibold text-purple-800 dark:text-purple-300 mb-2">
                {t("blogPostDrawer.summary")}
              </h2>
              <p className="text-sm mb-4">{post.summary}</p>
              <BlogPostMetadata post={post} t={t} />
            </DrawerBody>
          </ErrorBoundary>
        )}
      </DrawerContent>
    </Drawer>
  );
}
