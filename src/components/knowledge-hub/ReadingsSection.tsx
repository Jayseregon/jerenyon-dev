"use client";
import { Image } from "@nextui-org/react";

import { readingListData } from "@/src/data/readingListData";
import { BlogPostTags } from "@/src/components/knowledge-hub/BlogPostTags";

export function ReadingsSection() {
  return (
    <section className="max-w-4xl flex flex-col space-y-6 mx-auto">
      <h2 className="text-white font-medium text-2xl">On My Bookshelf</h2>
      {readingListData
        .slice()
        .reverse()
        .map((book, index) => (
          <div
            key={index}
            className="border border-purple-800 dark:border-purple-300 rounded-lg p-4 shadow-md flex flex-col space-y-3"
          >
            <div className="flex flex-col md:flex-row justify-between items-start space-y-3 md:space-y-0">
              <div className="flex flex-row space-x-4 items-center">
                <Image
                  removeWrapper
                  alt={book.title}
                  className="w-20 max-h-dvh object-cover rounded-md"
                  src={book.coverImage}
                />
                <div>
                  <h3 className="text-xl font-bold">{book.title}</h3>
                  <p className="text-sm text-white/60 italic">
                    by {book.author}
                  </p>
                </div>
              </div>
              <div className="md:ml-auto md:mt-1">
                <BlogPostTags tags={book.tags} />
              </div>
            </div>
            <p className="text-sm text-foreground text-justify">
              {book.summary}
            </p>
            <p className="text-sm text-foreground text-justify">
              <strong className="text-purple-800/70 dark:text-purple-300/70">
                My Takeaway:{" "}
              </strong>
              <span className="font-light">{book.takeaway}</span>
            </p>
          </div>
        ))}
    </section>
  );
}
