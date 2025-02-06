"use client";

import { useRouter } from "next/navigation";
import { Calculator, FilePenLine } from "lucide-react";
import { useContext, type JSX } from "react";

import { Button } from "@/components/ui/button";
import { NonceContext } from "@/src/app/providers";

interface NavigationCardProps {
  title: string;
  href: string;
  icon: JSX.Element;
}

export const NavigationBoards = () => {
  const nonce = useContext(NonceContext);
  const router = useRouter();

  const navigationCardsItems: NavigationCardProps[] = [
    {
      title: "Estimates",
      href: "/hobbiton/quotes-board",
      icon: (
        <Calculator
          style={{
            width: "48px",
            height: "48px",
          }}
        />
      ),
    },
    {
      title: "Editor",
      href: "/hobbiton/content-editor",
      icon: (
        <FilePenLine
          style={{
            width: "48px",
            height: "48px",
          }}
        />
      ),
    },
  ];

  const NavigationCard = ({ title, href, icon }: NavigationCardProps) => {
    return (
      <Button
        asChild
        className="w-full h-full p-0 hover:scale-105 transition-transform"
        nonce={nonce}
        size="lg"
        variant="form"
        onClick={() => router.push(href)}
      >
        <div className="flex flex-col items-center justify-center gap-4 p-4 text-purple-800 dark:text-purple-300">
          <div className="text-2xl font-semibold">{title}</div>
          {icon}
        </div>
      </Button>
    );
  };

  return (
    <div className="flex flex-col gap-10" nonce={nonce}>
      {navigationCardsItems.map((item, index) => (
        <NavigationCard key={index} {...item} />
      ))}
    </div>
  );
};
