"use client";

import React, { useState, useContext } from "react";
import { Button, Input, Spinner } from "@nextui-org/react";
import { Save } from "lucide-react";

import { NonceContext } from "@/src/app/providers";
import { TiptapEditor } from "@/components/hobbiton/TiptapEditor";

export default function ContentEditorPage() {
  const nonce = useContext(NonceContext);
  // const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [titleError, setTitleError] = useState("");

  const loadingSpinner = (
    <Spinner
      classNames={{
        label: "text-purple-800 dark:text-purple-300",
      }}
      nonce={nonce}
      size="sm"
    />
  );

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      setTitleError("");

      const response = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === "Slug already exists") {
          setTitleError("A post with a similar title already exists");
        } else {
          setTitleError(data.error || "Failed to save the post");
        }

        return;
      }

      // Success handling...
    } catch (error) {
      console.error("Failed to save the blog post: ", error);
      setTitleError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form className="w-full max-w-2xl mt-8" onSubmit={handleSubmit}>
        <div className="mb-4">
          <Input
            isRequired
            classNames={{
              inputWrapper:
                "border-purple-800/50 dark:border-purple-300/50 hover:!border-purple-800 hover:dark:!border-purple-300",
            }}
            color={undefined}
            errorMessage={titleError}
            id="post-title"
            isInvalid={!!titleError}
            name="post-title"
            nonce={nonce}
            placeholder="Title..."
            type="text"
            value={title}
            variant="underlined"
            onChange={(e) => {
              setTitle(e.target.value);
              setTitleError("");
            }}
          />
        </div>
        <TiptapEditor content={content} setContent={setContent} />
        <div className="flex items-center justify-center w-full">
          <Button
            className="w-1/2 bg-background text-foreground py-2 px-4 border border-purple-800 dark:border-purple-300 hover:bg-purple-800 hover:text-background hover:dark:text-purple-300 focus:outline-none"
            disabled={loading}
            radius="full"
            type="submit"
          >
            {loading ? loadingSpinner : <Save />}
          </Button>
        </div>
      </form>
    </div>
  );
}
