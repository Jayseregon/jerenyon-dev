"use client";

import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Input,
  Spinner,
  Select,
  SelectItem,
  Form,
} from "@nextui-org/react";
import { Save, Trash, RefreshCcw } from "lucide-react";
import { BlogPostCategory } from "@prisma/client";
import { JSONContent } from "@tiptap/core";

import { NonceContext } from "@/src/app/providers";
import { TiptapEditor } from "@/components/hobbiton/TiptapEditor";
import { BlogPost, PostDataProps } from "@/src/interfaces/Hub";
import {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
} from "@/actions/prisma/blogPosts/action";

export default function ContentEditorPage() {
  const nonce = useContext(NonceContext);

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState<JSONContent>();
  const [loading, setLoading] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [category, setCategory] = useState<BlogPostCategory>(
    BlogPostCategory.ARTICLE
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

  // Extract fetchPosts outside of useEffect for reuse
  const fetchPosts = async () => {
    const postsData = await getAllPosts();

    // Sort posts by updatedAt date in descending order
    postsData.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
    setPosts(postsData);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Group posts by category
  const postsByCategory = posts.reduce(
    (acc, post) => {
      (acc[post.category] = acc[post.category] || []).push(post);

      return acc;
    },
    {} as Record<BlogPostCategory, BlogPost[]>
  );

  const handlePostSelect = async (post: BlogPost) => {
    setSelectedPost(post);
    setTitle(post.title);
    setCategory(post.category);
    setContent(JSON.parse(post.content));
  };

  const handleSubmit = async (formDataEvent: FormData) => {
    try {
      setLoading(true);
      setTitleError("");

      const formData = Object.fromEntries(formDataEvent.entries()) as {
        title: string;
        category: BlogPostCategory;
      };

      const postData: PostDataProps = {
        title: formData.title,
        content: JSON.stringify(content),
        category: formData.category,
      };

      let response;

      if (selectedPost) {
        response = await updatePost(selectedPost.slug, postData);
      } else {
        response = await createPost(postData);
      }

      if (!response.ok) {
        setTitleError(response.message);
      } else {
        // Reset form fields
        setTitle("");
        setContent({ type: "doc", content: [] }); // Changed from undefined to empty JSONContent
        setCategory(BlogPostCategory.ARTICLE);
        setSelectedPost(null);

        // Refresh posts and editor
        await fetchPosts();
      }
    } catch (error) {
      console.error("Failed to save the blog post: ", error);
      setTitleError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (selectedPost) {
      setLoading(true);
      const response = await deletePost(selectedPost.slug);

      if (response.ok) {
        // Reset form fields
        setTitle("");
        setContent({ type: "doc", content: [] });
        setCategory(BlogPostCategory.ARTICLE);
        setSelectedPost(null);

        // Refresh posts
        await fetchPosts();
      } else {
        console.error(response.message);
      }
      setLoading(false);
    }
  };

  const handleReset = () => {
    setTitle("");
    setContent({ type: "doc", content: [] });
    setCategory(BlogPostCategory.ARTICLE);
    setSelectedPost(null);
    setTitleError("");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 border-r border-purple-800/50 dark:border-purple-300/50 overflow-y-auto">
        {Object.values(BlogPostCategory).map((category) => (
          <div key={category}>
            <h3 className="text-2xl font-bold text-foreground px-4 mt-4 mb-2">
              {category}
            </h3>
            <ul className="text-start px-2">
              {postsByCategory[category]?.map((post) => (
                <li key={post.id}>
                  <button
                    className={`w-full text-left px-2 py-3 cursor-pointer rounded-lg ${
                      selectedPost?.id === post.id
                        ? "bg-purple-200 dark:bg-purple-800"
                        : "hover:bg-purple-800/50"
                    }`}
                    onClick={() => handlePostSelect(post)}>
                    <div className="flex justify-between items-center">
                      <span className="text-foreground">{post.title}</span>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${
                          post.published ? "bg-green-500" : "bg-blue-500"
                        } text-white`}>
                        {post.published ? "Published" : "Draft"}
                      </span>
                    </div>
                    <div className="text-xs text-purple-300 italic">
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {/* Editor */}
      <div className="w-3/4 p-4 overflow-y-auto">
        <Form
          className="flex flex-col max-w-5xl mx-auto"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(new FormData(e.currentTarget));
          }}>
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
              }>
              {Object.values(BlogPostCategory).map((cat) => (
                <SelectItem
                  key={cat}
                  value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="w-full">
            <TiptapEditor
              content={content}
              setContent={setContent}
            />
          </div>

          <div className="flex items-center justify-center w-full gap-4">
            <Button
              className="bg-background text-foreground py-2 px-4 border border-gray-800 dark:border-gray-300 hover:bg-gray-800 hover:dark:bg-gray-950 hover:text-background hover:dark:text-foreground focus:outline-none"
              disabled={loading}
              radius="full"
              type="button"
              variant="bordered"
              onClick={handleReset}>
              <RefreshCcw />
            </Button>
            <Button
              className="bg-background text-foreground py-2 px-4 border border-purple-800 dark:border-purple-300 hover:dark:border-purple-950 hover:bg-purple-800 hover:dark:bg-purple-950 hover:text-background hover:dark:text-foreground focus:outline-none"
              disabled={loading}
              radius="full"
              type="submit">
              {loading ? loadingSpinner : <Save />}
            </Button>
            {selectedPost && (
              <Button
                className="bg-background text-red-600 dark:text-red-600 py-2 px-4 border border-red-600 dark:border-red-600 hover:border-red-600 hover:bg-red-600 hover:text-red-950 hover:dark:text-red-950 focus:outline-none"
                disabled={loading}
                radius="full"
                type="button"
                color="danger"
                variant="bordered"
                onClick={handleDelete}>
                {loading ? loadingSpinner : <Trash />}
              </Button>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
}
