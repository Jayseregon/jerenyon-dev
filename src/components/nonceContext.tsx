"use client";

import { createContext, useContext, ReactNode } from "react";

interface NonceContextProps {
  nonce: string | null;
}

interface NonceProviderProps {
  nonce: string;
  children: ReactNode;
}

const NonceContext = createContext<NonceContextProps>({ nonce: null });

export const NonceProvider = ({ nonce, children }: NonceProviderProps) => {
  return (
    <NonceContext.Provider value={{ nonce }}>{children}</NonceContext.Provider>
  );
};

export const useNonce = () => {
  const context = useContext(NonceContext);
  if (!context) {
    throw new Error("useNonce must be used within a NonceProvider");
  }
  return context.nonce;
};
