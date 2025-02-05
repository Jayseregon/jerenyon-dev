"use client";

import { useState, KeyboardEvent } from "react";

import { TagInputProps } from "@/src/interfaces/Hub";
import { Input } from "@/components/ui/input";
import { BlogPostTags } from "@/src/components/knowledge-hub/BlogPostTags";

export function TagInput({
  existingTags,
  selectedTags,
  onChange,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if ([" ", ";", ","].includes(event.key) && inputValue.trim()) {
      event.preventDefault();
      if (!selectedTags.includes(inputValue.trim())) {
        onChange([...selectedTags, inputValue.trim()]);
      }
      setInputValue("");
      setShowSuggestions(false);
    }
  };

  const handleSelect = (tagName: string) => {
    if (!selectedTags.includes(tagName)) {
      onChange([...selectedTags, tagName]);
    }
    setInputValue("");
    setShowSuggestions(false);
  };

  const handleDelete = (tagToDelete: string) => {
    onChange(selectedTags.filter((tag) => tag !== tagToDelete));
  };

  const filteredTags = existingTags
    .filter((tag) => !selectedTags.includes(tag.name))
    .filter((tag) => tag.name.toLowerCase().includes(inputValue.toLowerCase()));

  return (
    <div
      aria-label="Post tags input"
      className="w-full flex flex-row gap-4 items-center"
      role="region"
    >
      {/* Left side: Input and suggestions (1/3 width) */}
      <div className="w-1/3 relative">
        <Input
          aria-label="Add tags to post"
          className="w-full text-sm"
          placeholder="Add tags..."
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyDown={handleKeyDown}
        />
        {showSuggestions && filteredTags.length > 0 && (
          <div className="absolute left-0 right-0 bg-slate-950 border border-purple-800/50 dark:border-purple-300/50 text-foreground rounded mt-1 z-10 p-1">
            <BlogPostTags
              className="justify-start"
              tags={filteredTags}
              // onTagClick adds the tag when a suggestion is clicked
              onTagClick={(tag) => handleSelect(tag.name)}
            />
          </div>
        )}
      </div>

      {/* Right side: Selected tags (2/3 width) */}
      <div className="w-2/3">
        <BlogPostTags
          tags={existingTags.filter((tag) => selectedTags.includes(tag.name))}
          // onTagClick removes the tag when clicked
          onTagClick={(tag) => handleDelete(tag.name)}
        />
      </div>
    </div>
  );
}
