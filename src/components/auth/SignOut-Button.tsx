"use client";

import { PowerOff, LayoutDashboard } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export const SignOut = () => {
  const router = useRouter();

  return (
    <div className="flex gap-3 px-2">
      <button
        className="bg-rose-800 text-white rounded-full p-1"
        type="submit"
        onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
      >
        <PowerOff size={16} strokeWidth={2} />
      </button>
      <button
        className="bg-gradient-to-tr from-amber-300 to-fuchsia-500 text-white rounded-lg p-1"
        type="button"
        onClick={() => router.push("/hobbiton")}
      >
        <LayoutDashboard size={16} strokeWidth={2} />
      </button>
    </div>
  );
};
