import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { Share2, Link } from "lucide-react";
// import { LinkedinShareButton } from "react-share";
import { FaBluesky } from "react-icons/fa6";
import { useTranslations } from "next-intl";

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
    const shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(summary)}`;

    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  const handleBlueskyShare = () => {
    const text = `📌 ${title}<br /><br />📝 ${summary}<br /><br />🔗 ${url}`;
    const shareUrl = `https://bsky.app/intent/compose?text=${encodeURIComponent(text)}`;

    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Dropdown
      showArrow
      classNames={{
        base: "before:bg-default-200",
        content:
          "py-1 px-1 border border-purple-800 dark:border-purple-300 bg-background",
      }}
    >
      <DropdownTrigger>
        <Button
          aria-label="Share options"
          className="bg-background border text-purple-800 dark:text-purple-300 border-purple-800 dark:border-purple-300 min-w-fit px-4"
          nonce={nonce}
          radius="md"
          variant="bordered"
        >
          <div className="flex items-center gap-2">
            <Share2 size={20} />
          </div>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Share options"
        className="p-1"
        itemClasses={{
          base: [
            "rounded-md",
            "text-purple-800 dark:text-purple-300",
            "data-[hover=true]:bg-purple-100 dark:data-[hover=true]:bg-purple-900",
            "data-[selectable=true]:focus:bg-purple-100 dark:data-[selectable=true]:focus:bg-purple-900",
          ],
        }}
      >
        <DropdownItem
          key="copy"
          startContent={
            <Link className="text-purple-800 dark:text-purple-300" size={20} />
          }
          textValue="Copy link"
          onPress={handleCopyLink}
        >
          {t("shareButton.copyLink")}
        </DropdownItem>

        {/* Comment out original LinkedInShareButton code */}

        {/* <DropdownItem
          key="linkedin"
          startContent={
            <LinkedInIcon
              className="text-purple-800 dark:text-purple-300"
              size={20}
            />
          }
          textValue="Share on LinkedIn">
          <LinkedinShareButton
            source={window.location.origin}
            summary={summary}
            title={title}
            url={url}>
            <span>Share on LinkedIn</span>
          </LinkedinShareButton>
        </DropdownItem> */}

        <DropdownItem
          key="linkedin"
          startContent={
            <LinkedInIcon
              className="text-purple-800 dark:text-purple-300"
              size={20}
            />
          }
          textValue="Share on LinkedIn"
          onPress={handleLinkedInShare}
        >
          {t("shareButton.shareLinkedin")}
        </DropdownItem>

        <DropdownItem
          key="bluesky"
          startContent={
            <FaBluesky
              className="text-purple-800 dark:text-purple-300"
              size={20}
            />
          }
          textValue="Share on Bluesky"
          onPress={handleBlueskyShare}
        >
          {t("shareButton.shareBluesky")}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
