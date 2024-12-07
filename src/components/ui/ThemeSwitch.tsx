import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { SunThemeIcon, MoonThemeIcon } from "@/components/icons";

import CustomToggleSwitch from "./CustomToggleSwitch";

interface ThemeSwitchProps {
  className?: string;
  nonce: string;
}

export default function ThemeSwitch({ className, nonce }: ThemeSwitchProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <CustomToggleSwitch
      className={className}
      height={32}
      isOn={theme === "dark"}
      nonce={nonce}
      offColor="amber"
      offIcon={<SunThemeIcon nonce={nonce} />}
      width={64}
      onColor="purple"
      onIcon={<MoonThemeIcon nonce={nonce} />}
      onToggle={() => setTheme(theme === "dark" ? "light" : "dark")}
    />
  );
}
