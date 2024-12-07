import type { JSX } from "react";

import { redirect } from "next/navigation";
import { LayoutDashboard } from "lucide-react";

import { signIn, auth, providerMap } from "@/auth";
import { GitHubIcon } from "@/components/icons";

export default async function SignInPage(): Promise<JSX.Element> {
  const session = await auth();

  if (session) {
    redirect("/hobbiton");
  }

  return (
    <div className="flex flex-col items-center justify-center h-fit pt-10">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-2">
          <GitHubIcon size={100} />
          <h2>Access restricted to authorized users only.</h2>
        </div>

        <div className="my-10" />

        {Object.values(providerMap).map((provider) => (
          <form
            key={provider.id}
            action={async () => {
              "use server";
              try {
                await signIn(provider.id);
              } catch (error) {
                throw error;
              }
            }}
          >
            <button
              className="bg-gradient-to-tr from-amber-300 to-fuchsia-500 text-white rounded-lg shadow-lg p-3"
              type="submit"
            >
              <LayoutDashboard size={28} strokeWidth={3} />
            </button>
          </form>
        ))}
      </div>
    </div>
  );
}
