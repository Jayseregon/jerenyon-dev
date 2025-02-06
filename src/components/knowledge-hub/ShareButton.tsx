import { Share2, Link } from "lucide-react";
import { FaBluesky } from "react-icons/fa6";
import { useTranslations } from "next-intl";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LinkedInIcon } from "@/components/icons";
import { ShareButtonProps } from "@/src/interfaces/Hub";

export function ShareButton({ url, title, summary, nonce }: ShareButtonProps) {
  const t = useTranslations("knowledge-hub");

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (error) {
      console.error("Error copying link: ", error);
    }
  };

  const handleLinkedInShare = () => {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  const handleBlueskyShare = () => {
    const text = `📌 ${title}<br /><br />📝 ${summary}<br /><br />🔗 ${url}`;
    const shareUrl = `https://bsky.app/intent/compose?text=${encodeURIComponent(text)}`;

    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button nonce={nonce} variant="ghost">
          <Share2 className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-48 border-purple-800 dark:border-purple-300"
      >
        <DropdownMenuItem
          className="flex items-start gap-2 cursor-pointer"
          onClick={handleCopyLink}
        >
          <Link className="h-5 w-5" />
          <span>{t("shareButton.copyLink")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleLinkedInShare}
        >
          <LinkedInIcon className="h-5 w-5" />
          <span>{t("shareButton.shareLinkedin")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-start gap-2 cursor-pointer"
          onClick={handleBlueskyShare}
        >
          <FaBluesky className="h-5 w-5" />
          <span>{t("shareButton.shareBluesky")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
