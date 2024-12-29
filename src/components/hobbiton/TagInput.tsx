"use client";

import { useState, KeyboardEvent, useContext } from "react";
import { Chip, Autocomplete, AutocompleteItem } from "@nextui-org/react";

import { TagInputProps } from "@/src/interfaces/Hub";
import { NonceContext } from "@/src/app/providers";

export function TagInput({
  existingTags,
  selectedTags,
  onChange,
}: TagInputProps) {
  const nonce = useContext(NonceContext);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if ([" ", ";", ","].includes(event.key) && inputValue.trim()) {
      event.preventDefault();
      if (!selectedTags.includes(inputValue.trim())) {
        onChange([...selectedTags, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const handleSelect = (tagName: string) => {
    if (!selectedTags.includes(tagName)) {
      onChange([...selectedTags, tagName]);
    }
    setInputValue("");
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
      nonce={nonce}
      role="region">
      <Autocomplete
        aria-label="Add tags to post"
        className="w-1/4"
        classNames={{
          base: "max-w-full",
          listbox: "bg-background",
          popoverContent: "bg-background",
        }}
        inputValue={inputValue}
        nonce={nonce}
        placeholder="Add tags..."
        variant="bordered"
        onInputChange={(value) => setInputValue(value)}
        onKeyDown={handleKeyDown}>
        {filteredTags.map((tag) => (
          <AutocompleteItem
            key={tag.id}
            aria-label={`Select tag ${tag.name}`}
            nonce={nonce}
            value={tag.name}
            onPress={() => handleSelect(tag.name)}>
            {tag.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>

      <div
        aria-label="Selected tags"
        className="flex-1 flex flex-row flex-wrap gap-2 items-center"
        nonce={nonce}
        role="list">
        {selectedTags.map((tag) => (
          <Chip
            key={tag}
            aria-label={`Remove tag ${tag}`}
            classNames={{
              base: "bg-transparent border border-purple-500 transition-colors",
              content: "text-sm text-purple-500",
              closeButton: "text-purple-500 hover:text-white",
            }}
            nonce={nonce}
            radius="lg"
            size="sm"
            variant="flat"
            onClose={() => handleDelete(tag)}>
            {tag}
          </Chip>
        ))}
      </div>
    </div>
  );
}
