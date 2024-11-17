import React, { forwardRef } from "react";
import { Link, Button } from "@nextui-org/react";
import { useTheme } from "next-themes";

interface CustomButtonProps {
  href: string;
  position: string;
  children: React.ReactNode;
}

const FrontButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ href, position, children }, ref) => {
    const { theme } = useTheme();

    return (
      <Button
        ref={ref}
        showAnchorIcon
        as={Link}
        className={`absolute ${position} bg-background border-2 border-[#eec198] hover:border-amber-500 shadow-lg ${
          theme === "dark" ? "shadow-[#000039]" : "shadow-[#967b93]"
        } text-foreground p-2 z-50`}
        href={href}
        radius="full"
      >
        {children}
      </Button>
    );
  },
);

FrontButton.displayName = "FrontButton";

export default FrontButton;
