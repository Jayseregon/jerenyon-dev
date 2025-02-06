"use client";

import React, { useContext } from "react";
import { Aperture } from "lucide-react";

import { NonceContext } from "@/src/app/providers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const AdminAvatar = ({ image }: { image: any }) => {
  const nonce = useContext(NonceContext);

  return (
    <Avatar>
      <AvatarImage
        nonce={nonce}
        src={image ?? "https://i.pravatar.cc/150?img=27"}
      />
      <AvatarFallback>
        <Aperture
          className="animate-pulse w-6 h-6 text-purple-500"
          fill="currentColor"
          size={20}
        />
      </AvatarFallback>
    </Avatar>
  );
};
