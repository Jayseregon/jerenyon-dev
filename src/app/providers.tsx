"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

// Create the NonceContext
const NonceContext = React.createContext<string | undefined>(undefined);

export { NonceContext };

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
  nonce?: string;
}

export function Providers({ children, themeProps, nonce }: ProvidersProps) {
  const router = useRouter();

  return (
    <NonceContext.Provider value={nonce}>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      </NextUIProvider>
    </NonceContext.Provider>
  );
}
