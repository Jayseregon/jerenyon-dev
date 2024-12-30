"use client";

import { useContext } from "react";

import { AdminAvatar } from "@/components/auth/AdminAvatar";
import { AuthPageTitleProps } from "@/interfaces/Auth";
import { NonceContext } from "@/src/app/providers";

export const AuthPageTitle = ({
  pageTitle,
  heroTitle,
  image,
}: AuthPageTitleProps) => {
  const nonce = useContext(NonceContext);

  return (
    <div className="flex flex-col items-center justify-center" nonce={nonce}>
      <h1 className="text-purple-800 dark:text-purple-300 mb-3" nonce={nonce}>
        {pageTitle}
      </h1>
      <AdminAvatar image={image} />
      <div className="py-5" nonce={nonce} />
      <h2 className="text-5xl font-bold" nonce={nonce}>
        {heroTitle}
      </h2>
    </div>
  );
};
