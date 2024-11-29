import type { NextAuthConfig } from "next-auth";
import type { Provider } from "next-auth/providers";

import { type DefaultSession } from "next-auth";
import NextAuth from "next-auth";
import "next-auth/jwt";
import GitHub from "next-auth/providers/github";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}

const authorizedMembers = [
  { email: "jayseregon@gmail.com", name: "Jayseregon" },
];

const providers: Provider[] = [GitHub];

export const config = {
  providers: providers,
  pages: {
    signIn: "/signin",
  },
  trustHost: true,
  callbacks: {
    async signIn({ user }) {
      // Check if the user's email is authorized
      const isAuthorized = authorizedMembers.some(
        (member) => member.email === user.email && member.name === user.name
      );

      if (isAuthorized) {
        return true; // Allow sign in
      } else {
        return false; // Block sign in
      }
    },
    async jwt({ token, profile }) {
      if (profile && typeof profile.id === "string") {
        token.id = profile.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour
    updateAge: 60 * 60, // 1 hour
  },
  debug: process.env.NODE_ENV !== "production",
} satisfies NextAuthConfig;

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});

export const { handlers, auth, signIn, signOut } = NextAuth(config);
