"use client";

import { PowerOff, SquareMenu } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export const SignOut = () => {
  const router = useRouter();

  return (
    <div className="flex gap-3 px-2">
      <Button
        className="bg-gradient-to-tr from-amber-300 to-fuchsia-500 text-white rounded-lg p-1"
        size="icon"
        type="button"
        onClick={() => router.push("/hobbiton")}
      >
        <SquareMenu size={16} strokeWidth={2} />
      </Button>
      <Button
        className="bg-rose-800 text-white rounded-full p-1"
        size="icon"
        type="submit"
        onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
      >
        <PowerOff size={16} strokeWidth={2} />
      </Button>
    </div>
  );
};
