"use client";
import Image from "next/image";
import { useContext } from "react";

import { LoadDynamicImageProps } from "@/interfaces/mdx";
import { NonceContext } from "@/src/app/providers";

export default function LoadDynamicImage({
  imageName,
}: LoadDynamicImageProps): JSX.Element {
  const imgSrc = `/docs/${imageName}.jpg`;
  const nonce = useContext(NonceContext);

  return (
    <span className="flex flex-col items-center" nonce={nonce}>
      <Image
        alt={imageName}
        className="shadow-xl shadow-slate-600/80 dark:shadow-teal-900/80"
        height={200}
        nonce={nonce}
        src={imgSrc}
        style={{ width: "50%", height: "auto" }}
        width={200}
      />
    </span>
  );
}
