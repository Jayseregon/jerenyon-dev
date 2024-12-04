import React from "react";

import { auth } from "@/auth";
import { AuthPageTitle } from "@/components/hobbiton/AuthPageTitle";
import { UnAuthenticated } from "@/components/auth/unAuthenticated";
import { BoardListQuotes } from "@/src/components/hobbiton/BoardListQuotes";

export default async function HobbitonPage() {
  const session = await auth();

  if (!session) return <UnAuthenticated />;

  return <HobbitonPageContent session={session} />;
}

function HobbitonPageContent({ session }: { session: any }) {
  return (
    <div className="flex flex-col items-center">
      <AuthPageTitle
        heroTitle={`Welcome back, ${session.user.name}`}
        image={session.user.image}
        pageTitle="Hobbiton"
      />
      <BoardListQuotes />
    </div>
  );
}
