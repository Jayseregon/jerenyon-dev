"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
// import { NonceProvider } from "@/components/nonceContext";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  // const nonce =
  //   document.cookie
  //     .split("; ")
  //     .find((row) => row.startsWith("nonce="))
  //     ?.split("=")[1] || "";

  return (
    // <NonceProvider nonce={nonce}>
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </NextUIProvider>
    // </NonceProvider>
  );
}
