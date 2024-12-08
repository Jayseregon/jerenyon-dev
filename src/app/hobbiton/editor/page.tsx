"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { TiptapEditor } from "@/components/hobbiton/TiptapEditor";

export default function EditorPage() {
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
    <form className="w-full max-w-2xl mt-8" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="post-title"
        >
          Title
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="post-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4 border rounded-lg shadow-xl border border-purple-800 dark:border-purple-300">
        <TiptapEditor content={content} setContent={setContent} />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  );
}
