import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { Share2, Link } from "lucide-react";
import { LinkedinShareButton } from "react-share";

import { LinkedInIcon } from "@/components/icons";

interface ShareButtonProps {
  url: string;
  title: string;
  summary: string;
  nonce?: string;
}

export function ShareButton({ url, title, summary, nonce }: ShareButtonProps) {
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (error) {
      console.error("Error copying link: ", error);
    }
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
          Copy link
        </DropdownItem>
        <DropdownItem
          key="linkedin"
          startContent={
            <LinkedInIcon
              className="text-purple-800 dark:text-purple-300"
              size={20}
            />
          }
          textValue="Share on LinkedIn"
        >
          <LinkedinShareButton
            source={window.location.origin}
            summary={summary}
            title={title}
            url={url}
          >
            <span>Share on LinkedIn</span>
          </LinkedinShareButton>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
