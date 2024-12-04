"use client";

import { Avatar } from "@nextui-org/react";
import React, { useContext } from "react";
import { Aperture } from "lucide-react";

import { NonceContext } from "@/src/app/providers";

export const AdminAvatar = ({ image }: { image: any }) => {
  const nonce = useContext(NonceContext);

  return (
    <Avatar
      classNames={{
        base: "bg-gradient-to-tr from-amber-300 to-fuchsia-500",
      }}
      color={undefined}
      fallback={
        <Aperture
          className="animate-pulse w-6 h-6 text-purple-500"
          fill="currentColor"
          size={20}
        />
      }
      name="Admin Avatar"
      nonce={nonce}
      size="md"
      src={image ?? "https://i.pravatar.cc/150?img=27"}
    />
  );
};
