"use client";

import React, { useState, useContext } from "react";
import {
  Button,
  Input,
  Spinner,
  Select,
  SelectItem,
  Form,
} from "@nextui-org/react";
import { Save } from "lucide-react";
import { BlogPostCategory } from "@prisma/client";

import { NonceContext } from "@/src/app/providers";
import { TiptapEditor } from "@/components/hobbiton/TiptapEditor";

export default function ContentEditorPage() {
  const nonce = useContext(NonceContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [category, setCategory] = useState<BlogPostCategory>(
    BlogPostCategory.ARTICLE,
  );

  const loadingSpinner = (
    <Spinner
      classNames={{
        label: "text-purple-800 dark:text-purple-300",
      }}
      nonce={nonce}
      size="sm"
    />
  );

  const handleSubmit = async (formDataEvent: FormData) => {
    try {
      setLoading(true);
      setTitleError("");

      const formData = Object.fromEntries(formDataEvent.entries()) as {
        title: string;
        category: BlogPostCategory;
      };

      const response = await fetch("/api/blog/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          content,
          category: formData.category,
        }),
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
    } catch (error) {
      console.error("Failed to save the blog post: ", error);
      setTitleError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      className="flex flex-col max-w-5xl mx-auto"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(new FormData(e.currentTarget));
      }}
    >
      <div className="flex flex-row gap-4 w-full">
        <Input
          isRequired
          aria-label="post-title"
          className="w-3/4"
          classNames={{
            inputWrapper:
              "border-purple-800/50 dark:border-purple-300/50 hover:!border-purple-800 hover:dark:!border-purple-300",
          }}
          color={undefined}
          errorMessage={titleError}
          id="post-title"
          isInvalid={!!titleError}
          name="title"
          nonce={nonce}
          placeholder="Title..."
          type="text"
          value={title}
          variant="bordered"
          onChange={(e) => {
            setTitle(e.target.value);
            setTitleError("");
          }}
        />
        <Select
          isRequired
          aria-label="post-category"
          className="w-1/4"
          classNames={{
            popoverContent: "bg-background",
            trigger:
              "border-purple-800/50 dark:border-purple-300/50 hover:!border-purple-800 hover:dark:!border-purple-300",
          }}
          name="category"
          nonce={nonce}
          selectedKeys={[category]}
          variant="bordered"
          onSelectionChange={(keys) =>
            setCategory(Array.from(keys)[0] as BlogPostCategory)
          }
        >
          {Object.values(BlogPostCategory).map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className="w-full">
        <TiptapEditor content={content} setContent={setContent} />
      </div>

      <div className="flex items-center justify-center w-full">
        <Button
          className="bg-background text-foreground py-2 px-4 border border-purple-800 dark:border-purple-300 hover:bg-purple-800 hover:text-background hover:dark:text-purple-300 focus:outline-none"
          disabled={loading}
          radius="full"
          type="submit"
        >
          {loading ? loadingSpinner : <Save />}
        </Button>
      </div>
    </Form>
  );
}
