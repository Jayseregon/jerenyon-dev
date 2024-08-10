import React from "react";

import { HeartFooterIcon } from "@/components/icons";

import { siteConfig } from "../config/site";

interface FooterProps {
  nonce?: string;
}

export const Footer = ({ nonce }: FooterProps) => {
  return (
    <footer
      className="w-full text-xs flex items-center justify-center py-3 text-gray-300/50"
      nonce={nonce || undefined}
    >
      <div className="flex items-center space-x-1">
        <span>Made with</span>
        <HeartFooterIcon className="fill-gray-300/50" size={10} />
        <span>
          in Canada &copy; {new Date().getFullYear()} {siteConfig.name}
        </span>
      </div>
    </footer>
  );
};
