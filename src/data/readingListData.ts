import { Tag } from "@/src/interfaces/Hub";

export interface ReadingItem {
  title: string;
  coverImage: string;
  author: string;
  takeaway: string;
  tags: Tag[];
}

export const readingListData: ReadingItem[] = [
  {
    title: "Python Crash Course, 2nd Edition",
    coverImage: "/assets/readings/python-crash-course.webp",
    author: "Eric Matthes",
    takeaway:
      "This book is actually the first book I read about Python, and it proved to be a great introduction to the language. At the time, I was already into Swift and the newly released SwiftUI, and I wanted to go back to programming with Python—having only dabbled using Python for spatial analysis within QGIS and ArcGIS, back at the University. The author does a great job explaining the basics of Python as well as some more advanced topics. However, what I really liked about it was the multiple code projects, which let us play with real-world applications. I would recommend this book to anyone who wants to learn Python from scratch.",
    tags: [
      { id: "1", name: "Python Basics" },
      { id: "2", name: "Fundamentals" },
      { id: "3", name: "Programming Projects" },
      { id: "4", name: "Beginne Friendly" },
      { id: "5", name: "Hands-On Learning" },
    ],
  },
  {
    title: "The Recursive Book of Recursion",
    coverImage: "/assets/readings/recursive-book-of-recursion.webp",
    author: "Al Sweigart",
    takeaway:
      "Recursion is a complex topic, no matter the language, and before reading this book, they seemed scary and impressive. After reading this book, it still feels impressive, but in a good way this time. The author does a great job of explaining the concepts, the power of recursion to solve problems, when to use it, and also when NOT to use it. I would recommend this book to anyone who wants to learn more about recursion and how to use it in Python.",
    tags: [
      { id: "1", name: "Recursion" },
      { id: "2", name: "Algorithms" },
      { id: "3", name: "Data Structures" },
      { id: "4", name: "Problem Solving" },
      { id: "5", name: "Computer Science" },
    ],
  },
  {
    title: "Fluent Python",
    coverImage: "/assets/readings/fluent-python.webp",
    author: "Luciano Ramalho",
    takeaway:
      "There is learning Python, and then there is mastering Python. This book is probably the best and one of the toughest books I have read so far. It is not for beginners, but the content is so rich and invaluable that it is worth the effort. The author dives deep into the standard library, from known data structures, to generators and coroutines, and metaprogramming. It is a must-read for anyone who wants to take their Python skills to the next level.",
    tags: [
      { id: "1", name: "Advanced Python" },
      { id: "2", name: "Standard Library" },
      { id: "3", name: "Performance" },
      { id: "4", name: "Best Practices" },
      { id: "5", name: "In-Depth" },
    ],
  },
  {
    title: "The Art of Clean Code",
    coverImage: "/assets/readings/art-of-clean-code.webp",
    author: "Christian Mayer",
    takeaway:
      "We can often assume that we are writing clean code, but this book is a great reminder that there is always room for improvement. The author is presenting us with 8 core principles, and even more best practices to write clean code, and explains why it is important. After reading it, I feel it is more than just best practices, but rules to live by, or code by. I would recommend this book to anyone who wants to write better and cleaner code.",
    tags: [
      { id: "1", name: "Clean Code" },
      { id: "2", name: "Code Quality" },
      { id: "3", name: "80/20 Principle" },
      { id: "4", name: "Simplicity" },
      { id: "5", name: "Less is More" },
    ],
  },
  {
    title: "Clean Architecture",
    coverImage: "/assets/readings/clean-architecture.webp",
    author: "Robert C. Martin",
    takeaway:
      "There is clean code, then there is clean architecture. This book is not just a great follow-up to The Art of Clean Code; it feels like the actual foundation of clean code and dives deep into the architecture of software systems. From programming paradigms to design principles and architecture per se, Uncle Bob explains in depth the importance and benefits of designing systems that are maintainable, scalable, and testable. I would recommend this book to anyone who wants to learn about software architecture.",
    tags: [
      { id: "1", name: "Architecture" },
      { id: "2", name: "Design Patterns" },
      { id: "3", name: "SOLID Principles" },
      { id: "4", name: "Clean Code" },
      { id: "5", name: "Software Engineering" },
    ],
  },
];
