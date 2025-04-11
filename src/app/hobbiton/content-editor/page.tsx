"use client";

import React, { useState, useContext, useEffect, useRef } from "react";
import { Save, Trash, RefreshCcw, ImageOff, Loader2 } from "lucide-react";
import { JSONContent } from "@tiptap/core";

import { NonceContext } from "@/src/app/providers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TiptapEditor } from "@/components/hobbiton/TiptapEditor";
import { BlogPost, PostDataProps, Tag } from "@/src/interfaces/Hub";
import {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
  getAllTags,
} from "@/actions/prisma/blogPosts/action";
import { TagInput } from "@/components/hobbiton/TagInput";
import {
  uploadCoverImageToBunny,
  deleteCoverImageFromBunny,
} from "@/actions/bunny/action";

export default function ContentEditorPage() {
  const nonce = useContext(NonceContext);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState<JSONContent>();
  const [summary, setSummary] = useState("");
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [_titleError, setTitleError] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [existingTags, setExistingTags] = useState<Tag[]>([]);
  const [coverImage, setCoverImage] = useState<string>("");

  const loadingSpinner = (
    <Loader2 className="h-4 w-4 animate-spin text-purple-800 dark:text-purple-300" />
  );

  // Extract loadData outside of useEffect for reuse
  const loadData = async () => {
    const [postsData, tagsData] = await Promise.all([
      getAllPosts(),
      getAllTags(),
    ]);

    // Sort posts by updatedAt date in descending order
    postsData.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );

    setPosts(postsData);
    setExistingTags(tagsData);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleReset = () => {
    setTitle("");
    setContent({ type: "doc", content: [] });
    setSelectedPost(null);
    setTitleError("");
    setSummary("");
    setPublished(false);
    setTags([]);
    setCoverImage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePostSelect = async (post: BlogPost) => {
    setSelectedPost(post);
    setTitle(post.title);
    setContent(JSON.parse(post.content));
    setSummary(post.summary);
    setPublished(post.published);
    setTags(post.tags.map((tag) => tag.name));
    setCoverImage(post.coverImage || "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCoverImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];

    try {
      const buffer = await file.arrayBuffer();
      const url = await uploadCoverImageToBunny(buffer, file.name);

      setCoverImage(url);
      // Reset file input after successful upload
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Failed to upload cover image:", error);
    }
  };

  const handleRemoveCoverImage = async () => {
    if (coverImage) {
      try {
        // Extract filename from URL
        const fileName = coverImage.split("/").pop();

        if (fileName) {
          await deleteCoverImageFromBunny(fileName);
        }
      } catch (error) {
        console.error("Failed to delete cover image:", error);
      }
    }
    setCoverImage("");
  };

  const handleSubmit = async (formDataEvent: FormData) => {
    try {
      setLoading(true);
      setTitleError("");

      const formData = Object.fromEntries(formDataEvent.entries()) as {
        title: string;
        summary: string;
        published: string;
      };

      const postData: PostDataProps = {
        title: formData.title,
        content: JSON.stringify(content),
        summary: formData.summary,
        published: formData.published === "true",
        tags: tags,
        coverImage: coverImage,
        views: selectedPost?.views ?? 0,
        likes: selectedPost?.likes ?? 0,
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
        handleReset();
        // Refresh posts and editor
        await loadData();
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
        handleReset();
        // Refresh posts
        await loadData();
      } else {
        console.error(response.message);
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 border-r border-purple-800/50 dark:border-purple-300/50 overflow-y-auto">
        <h3 className="text-2xl font-bold text-foreground px-4 mt-4 mb-2">
          Blog Posts
        </h3>
        <ul className="text-start px-2">
          {posts.map((post) => (
            <li key={post.id}>
              <button
                className={`w-full text-left px-2 py-3 cursor-pointer rounded-lg ${
                  selectedPost?.id === post.id
                    ? "bg-purple-200 dark:bg-purple-800"
                    : "hover:bg-purple-800/50"
                }`}
                onClick={() => handlePostSelect(post)}
              >
                <div className="flex justify-between items-center">
                  <span className="text-foreground">{post.title}</span>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      post.published ? "bg-green-500" : "bg-blue-500"
                    } text-white`}
                  >
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
      {/* Editor */}
      <div className="w-3/4 p-4 overflow-y-auto">
        <form
          className="flex flex-col max-w-5xl mx-auto"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(new FormData(e.currentTarget));
          }}
        >
          <div className="flex flex-row gap-4 w-full">
            <Input
              required
              className="w-full"
              id="post-title"
              name="title"
              placeholder="Title..."
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setTitleError("");
              }}
            />

            <div className="flex items-center justify-center gap-2">
              <Button
                disabled={loading}
                size="icon"
                type="button"
                variant="default"
                onClick={handleReset}
              >
                <RefreshCcw className="h-4 w-4" />
              </Button>
              <Button
                disabled={loading}
                size="icon"
                type="submit"
                variant="success"
              >
                {loading ? loadingSpinner : <Save className="h-4 w-4" />}
              </Button>
              {selectedPost && (
                <Button
                  disabled={loading}
                  size="icon"
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                >
                  {loading ? loadingSpinner : <Trash className="h-4 w-4" />}
                </Button>
              )}
            </div>
          </div>

          <div className="w-full my-4">
            <Textarea
              required
              id="post-summary"
              name="summary"
              placeholder="Summary..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>

          <div className="flex flex-row gap-4 w-full">
            <Select
              name="published"
              value={published.toString()}
              onValueChange={(value) => setPublished(value === "true")}
            >
              <SelectTrigger className="w-1/4">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Published</SelectItem>
                <SelectItem value="false">Draft</SelectItem>
              </SelectContent>
            </Select>

            <Input
              ref={fileInputRef}
              accept="image/*"
              className="w-3/4"
              name="cover-image"
              type="file"
              onChange={handleCoverImageChange}
            />
            {coverImage && (
              <Button
                size="icon"
                type="button"
                variant="destructive"
                onClick={handleRemoveCoverImage}
              >
                <ImageOff className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="w-full my-4">
            <TagInput
              existingTags={existingTags}
              nonce={nonce}
              selectedTags={tags}
              onChange={setTags}
            />
          </div>
          <div className="flex flex-row w-full p-2 text-purple-800 dark:text-purple-300 gap-4">
            {coverImage && (
              <div className="shrink-0">
                <img
                  alt="Cover Preview"
                  className="max-h-40 object-contain"
                  nonce={nonce}
                  src={coverImage}
                />
              </div>
            )}
            <div className="flex flex-col justify-end items-start text-sm">
              {selectedPost?.publishedAt && (
                <p className="mb-1">
                  Published:{" "}
                  {new Date(selectedPost.publishedAt).toLocaleString()}
                </p>
              )}
              {selectedPost?.updatedAt && (
                <p>
                  Updated: {new Date(selectedPost.updatedAt).toLocaleString()}
                </p>
              )}
            </div>
          </div>

          <div className="w-full">
            <TiptapEditor content={content} setContent={setContent} />
          </div>
        </form>
      </div>
    </div>
  );
}
