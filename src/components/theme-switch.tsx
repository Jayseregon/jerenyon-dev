import React, { FC } from "react";
import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@/components/icons";

export interface ThemeSwitchProps {
  className?: string;
  nonce?: string;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className, nonce }) => {
  const { theme, setTheme } = useTheme();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const checked = event.target.checked;
    setTheme(checked ? "dark" : "light");
  };

  return (
    <Switch
      defaultSelected
      onChange={handleChange}
      size="md"
      color="primary"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <SunIcon className={className} />
        ) : (
          <MoonIcon className={className} />
        )
      }
      className={className}
      nonce={nonce}></Switch>
  );
};
