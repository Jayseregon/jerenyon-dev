"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
  nonce?: string;
}

export function Providers({ children, themeProps, nonce }: ProvidersProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      {/* Ensure nonce passed as a prop takes precedence over nonce in themeProps */}
      <NextThemesProvider
        {...themeProps}
        nonce={nonce}>
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
