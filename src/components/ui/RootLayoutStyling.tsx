"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import Navbar from "./Navbar";
import Footer from "./Footer";

type Props = {
  children: ReactNode;
  nonce: string;
};

export default function RootLayoutStyling({ children, nonce }: Props) {
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  return (
    <div
      className={clsx("relative flex flex-col", {
        "h-screen": isMainPage,
        "min-h-screen": !isMainPage,
      })}
      nonce={nonce}
    >
      <Navbar nonce={nonce} />
      <main className="flex-grow" nonce={nonce}>
        {children}
      </main>
      <Footer nonce={nonce} />
    </div>
  );
}
