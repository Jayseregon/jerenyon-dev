"use client";
import { useRouter } from "next/navigation";
import { Card, CardBody } from "@nextui-org/react";
import { Calculator, FilePenLine } from "lucide-react";

interface NavigationCardProps {
  title: string;
  href: string;
  icon: JSX.Element;
}

export const NavigationBoards = () => {
  const router = useRouter();

  const navigationCardsItems: NavigationCardProps[] = [
    {
      title: "Estimates",
      href: "/hobbiton/quotes-board",
      icon: <Calculator size={40} />,
    },
    {
      title: "Editor",
      href: "/hobbiton/content-editor",
      icon: <FilePenLine size={40} />,
    },
  ];

  const NavigationCard = ({ title, href, icon }: NavigationCardProps) => {
    return (
      <Card
        isPressable
        className="w-full h-full cursor-pointer hover:scale-105 transition-transform bg-background border border-purple-800 dark:border-purple-300"
        onPress={() => router.push(href)}
      >
        <CardBody className="flex items-center justify-between text-purple-800 dark:text-purple-300">
          <div className="text-2xl font-semibold">{title}</div>
          {icon}
        </CardBody>
      </Card>
    );
  };

  return (
    <div className="flex flex-col gap-10">
      {navigationCardsItems.map((item, index) => (
        <NavigationCard key={index} {...item} />
      ))}
    </div>
  );
};
