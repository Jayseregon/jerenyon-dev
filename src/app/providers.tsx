"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes";
import { SessionProvider } from "next-auth/react";

// Create the NonceContext
const NonceContext = React.createContext<string | undefined>(undefined);

export { NonceContext };

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
  nonce?: string;
}

export function Providers({ children, themeProps, nonce }: ProvidersProps) {
  return (
    <SessionProvider>
      <NonceContext.Provider value={nonce}>
        <NextThemesProvider
          defaultTheme="dark"
          enableSystem={false}
          nonce={nonce}
          {...themeProps}
        >
          {children}
        </NextThemesProvider>
      </NonceContext.Provider>
    </SessionProvider>
  );
}
