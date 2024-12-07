import React, { useState } from "react";
import { useRouter } from "next/router";

import { auth } from "@/auth";
import { AuthPageTitle } from "@/components/hobbiton/AuthPageTitle";
import { UnAuthenticated } from "@/components/auth/unAuthenticated";
import { BoardListQuotes } from "@/src/components/hobbiton/BoardListQuotes";
import TiptapEditor from "@/components/tiptap/Editor";

export default async function HobbitonPage() {
  const session = await auth();

  if (!session) return <UnAuthenticated />;

  return <HobbitonPageContent session={session} />;
}

function HobbitonPageContent({ session }: { session: any }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    if (response.ok) {
      router.push("/knowledge-hub/posts");
    } else {
      console.error("Failed to save the blog post");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <AuthPageTitle
        heroTitle={`Welcome back, ${session.user.name}`}
        image={session.user.image}
        pageTitle="Hobbiton"
      />
      <BoardListQuotes />
      <form onSubmit={handleSubmit} className="w-full max-w-2xl mt-8">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Content
          </label>
          <TiptapEditor content={content} setContent={setContent} />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
