"use client";

import { useEffect, type JSX } from "react";
import { useRouter } from "next/navigation";
import { SquareMenu } from "lucide-react";
import { signIn, useSession } from "next-auth/react";

import { providerMap } from "@/auth";
import { GitHubIcon } from "@/components/icons";
import { Button } from "@/src/components/ui/button";

export default function SignInPage(): JSX.Element {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/hobbiton");
    }
  }, [session, router]);

  return (
    <div className="flex flex-col items-center justify-center h-fit pt-10">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-2">
          <GitHubIcon size={100} />
          <h2>Access restricted to authorized users only.</h2>
        </div>

        <div className="my-10" />

        {Object.values(providerMap).map((provider) => (
          <Button
            key={provider.id}
            className="bg-linear-to-tr from-amber-300 to-fuchsia-500 text-white rounded-lg shadow-lg p-3"
            size="icon"
            onClick={() => signIn(provider.id)}
          >
            <SquareMenu size={32} strokeWidth={3} />
          </Button>
        ))}
      </div>
    </div>
  );
}
