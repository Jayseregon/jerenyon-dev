"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

import { readingListData } from "@/src/data/readingListData";
import { BlogPostTags } from "@/src/components/knowledge-hub/BlogPostTags";

export function ReadingsSection() {
  const t = useTranslations("knowledge-hub");
  const [visibleItems, setVisibleItems] = useState(3);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleItems((prev) => prev + 5);
      }
    });

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="max-w-4xl flex flex-col space-y-6 mx-auto">
      <h2 className="text-white font-medium text-2xl">
        {t("bookshelf.title")}
      </h2>
      {readingListData
        .slice()
        .reverse()
        .slice(0, visibleItems)
        .map((book, index) => (
          <div
            key={index}
            className="border border-purple-800 dark:border-purple-300 rounded-lg p-4 shadow-md flex flex-col space-y-3"
          >
            <div className="flex flex-col md:flex-row justify-between items-start space-y-3 md:space-y-0">
              <div className="flex flex-row space-x-4">
                <Image
                  alt={book.title}
                  className="w-20 max-h-dvh object-cover rounded-md"
                  height={0}
                  sizes="100vw"
                  src={book.coverImage}
                  width={0}
                />

                <div className="text-start">
                  <h3 className="text-xl font-bold">{book.title}</h3>
                  <p className="text-sm text-white/60 italic">
                    by {book.author}
                  </p>
                </div>
              </div>
              <div className="md:ml-auto md:mt-1 md:w-1/3 md:flex md:flex-col">
                <BlogPostTags tags={book.tags} />
              </div>
            </div>
            <p className="text-sm text-foreground text-justify">
              <strong className="text-purple-800/70 dark:text-purple-300/70">
                My Takeaway:{" "}
              </strong>
              {book.takeaway}
            </p>
          </div>
        ))}
      <div ref={loadMoreRef} className="h-2" />
    </section>
  );
}
