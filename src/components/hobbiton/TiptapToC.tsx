import { TextSelection } from "@tiptap/pm/state";
import { FileClock } from "lucide-react";
import React from "react";

import { OnItemClick, ToCItemProps, ToCProps } from "@/src/interfaces/Hub";

// Reuse the same items you got in TiptapEditor, no editor creation here

const ToCItem = ({ item, onItemClick, index, nonce }: ToCItemProps) => {
  // Calculate padding based on level
  const getPaddingClass = (level: number) => {
    const paddings = {
      1: "pl-0",
      2: "pl-4",
      3: "pl-8",
      4: "pl-12",
      5: "pl-16",
      6: "pl-20",
    };

    return paddings[level as keyof typeof paddings] || "pl-0";
  };

  return (
    <div
      className={`${item.isActive && !item.isScrolledOver ? "is-active" : ""} 
        ${item.isScrolledOver ? "is-scrolled-over" : ""} 
        ${getPaddingClass(item.level)} transition-colors hover:text-purple-600 dark:hover:text-purple-400`}
      nonce={nonce}
    >
      <a
        data-item-index={index}
        href={`#${item.id}`}
        onClick={(e) => onItemClick(e, item.id)}
      >
        {item.textContent}
      </a>
    </div>
  );
};

const ToCEmptyState = ({ nonce }: { nonce?: string }) => (
  <div className="empty-state" nonce={nonce}>
    <p>
      <FileClock />
    </p>
  </div>
);

export function TiptapToC({ items = [], editor, nonce }: ToCProps) {
  if (!editor || items.length === 0) {
    return <ToCEmptyState nonce={nonce} />;
  }

  const onItemClick: OnItemClick = (e, id) => {
    e.preventDefault();
    const element = editor.view.dom.querySelector(`[data-toc-id="${id}"]`);

    if (!element) return;

    const pos = editor.view.posAtDOM(element, 0);
    const tr = editor.view.state.tr;

    tr.setSelection(new TextSelection(tr.doc.resolve(pos)));
    editor.view.dispatch(tr);
    editor.view.focus();

    if (history.pushState) {
      history.pushState(null, "", `#${id}`);
    }

    // Get the navbar height - adjust this value to match your navbar
    const navbarHeight = 64; // or whatever your navbar height is in pixels

    // Calculate the element's position relative to the viewport
    const elementPosition = element.getBoundingClientRect().top;
    // Add current scroll position to get absolute position
    const offsetPosition = elementPosition + window.scrollY;

    // Scroll to element with navbar offset
    window.scrollTo({
      top: offsetPosition - navbarHeight - 24, // added 24px extra padding for visual comfort
      behavior: "smooth",
    });
  };

  return (
    <div className="table-of-contents" nonce={nonce}>
      {items.map((item, i) => (
        <ToCItem
          key={item.id}
          index={i + 1}
          item={item}
          nonce={nonce}
          onItemClick={onItemClick}
        />
      ))}
    </div>
  );
}
