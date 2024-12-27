import { JSONContent } from "@tiptap/react";

export function extractImages(doc: JSONContent | undefined): string[] {
  if (!doc || !doc.content) return [];
  const imgs: string[] = [];
  // Recursively find all image nodes
  const scan = (node: JSONContent) => {
    if (node.type === "image" && node.attrs?.src) {
      imgs.push(node.attrs.src);
    }
    node.content?.forEach((child) => scan(child));
  };

  scan(doc);

  return imgs;
}
