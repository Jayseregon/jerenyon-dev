import { Tag } from "@/src/interfaces/Hub";

export interface ReadingItem {
  title: string;
  coverImage: string;
  author: string;
  summary: string;
  takeaway: string;
  tags: Tag[];
}

export const readingListData: ReadingItem[] = [
  {
    title: "The Pragmatic Programmer",
    coverImage: "/assets/readings/pragmatic-programmer.webp",
    author: "Andrew Hunt & David Thomas",
    summary:
      "Explores practical tips for mastering software development. This book covers everything from debugging to testing, encouraging an adaptable approach and continuous learning.",
    takeaway:
      "Focus on clean, flexible architecture. Embrace small, incremental improvements and maintain a proactive developer mindset.",
    tags: [
      { id: "1", name: "Software" },
      { id: "2", name: "Development" },
    ],
  },
  {
    title: "Clean Architecture",
    coverImage: "/assets/readings/clean-architecture.webp",
    author: "Robert C. Martin",
    summary:
      "Provides guidelines for designing robust, maintainable software systems. Highlights architectural boundaries and flexible design practices.",
    takeaway:
      "Emphasizes separation of concerns and framework independence, leading to a resilient, easily adaptable codebase.",
    tags: [
      { id: "1", name: "Architecture" },
      { id: "2", name: "Design" },
    ],
  },
  {
    title: "Fluent Python",
    coverImage: "/assets/readings/fluent-python.webp",
    author: "Luciano Ramalho",
    summary:
      "Delves into Python's features for writing clear, idiomatic code. Emphasizes harnessing powerful standard libraries to build concise solutions.",
    takeaway:
      "Leverage Pythonic patterns and libraries for more elegant problem-solving and performance optimization.",
    tags: [
      { id: "1", name: "Python" },
      { id: "2", name: "Programming" },
    ],
  },
  // ...add more entries as desired...
];
