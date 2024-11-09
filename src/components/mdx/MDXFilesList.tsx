"use client";

import { Link } from "@nextui-org/link";
import { useContext } from "react";

import { NonceContext } from "@/src/app/providers";
import { MdxFileListProps } from "@/interfaces/mdx";

export default function MDXFilesList({ mdFiles }: MdxFileListProps) {
  const nonce = useContext(NonceContext);

  return (
    <div>
      {mdFiles.map((file, index) => {
        const fileName = file.replace(".mdx", "");

        return (
          <ul key={index}>
            <li key={`${index}-${file}`}>
              <Link href={`/mdx-demo/${fileName}`} nonce={nonce}>
                {fileName}
              </Link>
            </li>
          </ul>
        );
      })}
    </div>
  );
}
