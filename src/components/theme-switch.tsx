import React from "react";
import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@/components/icons";

interface ThemeSwitchProps {
  className?: string;
  nonce?: string;
}

export const ThemeSwitch: React.FC<ThemeSwitchProps> = ({
  className,
  nonce,
}) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div>
      <Button
        isIconOnly
        color="primary"
        aria-label="Toggle theme"
        onClick={toggleTheme}
        className={className}
        nonce={nonce}>
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </Button>
    </div>
  );
};
