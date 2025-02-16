import { HighlightDefinition } from "@/src/interfaces/Embeddings";

export const highlightWords = new Set([
  "Generative AI",
  "FastAPI",
  "GIS",
  "Next.js",
  "Automation",
  "Vector Databases",
  "GitHub",
]);

export const highlightDefinitions: Record<string, HighlightDefinition> = {
  "Generative AI": {
    keyword: "Generative AI",
    definition:
      "Deep-learning models that generate new, high-quality content based on the data they have been trained on.",
    why: "Empowers Jerenyon Dev to build AI-driven tools using LLMs, RAG, and automation for intelligent, scalable solutions.",
  },
  FastAPI: {
    keyword: "FastAPI",
    definition:
      "A modern, high-performance Python web framework for building APIs with automatic OpenAPI documentation and type-driven development.",
    why: "Allows Jerenyon Dev to develop fast, efficient APIs for AI applications and scalable cloud services.",
  },
  GIS: {
    keyword: "GIS",
    definition:
      "Geographic Information Systems process, analyze, and visualize spatial data to extract insights through mapping and geospatial analysis.",
    why: "Enables Jerenyon Dev to integrate geoprocessing and spatial intelligence into AI-driven automation and analytics.",
  },
  "Next.js": {
    keyword: "Next.js",
    definition:
      "A React-based framework supporting server-side rendering (SSR) and static site generation (SSG) for enhanced performance and SEO.",
    why: "Powers Jerenyon Dev's development of fast, scalable, and SEO-optimized web applications, including this platform.",
  },
  Automation: {
    keyword: "Automation",
    definition:
      "The use of AI and technology to streamline repetitive tasks, reduce errors, and improve efficiency in workflows and operations.",
    why: "Allows Jerenyon Dev to eliminate manual bottlenecks, optimize development workflows, and focus on high-value innovation.",
  },
  "Vector Databases": {
    keyword: "Vector Databases",
    definition:
      "Specialized databases designed for storing and querying high-dimensional vector embeddings, essential for AI-powered search and retrieval.",
    why: "Enables Jerenyon Dev to build advanced AI applications that leverage similarity search, RAG, and intelligent knowledge retrieval.",
  },
  GitHub: {
    keyword: "GitHub",
    definition:
      "A platform for version control, collaboration, and CI/CD automation, enabling streamlined software development workflows.",
    why: "Provides Jerenyon Dev with a robust foundation for managing code, deploying projects, and ensuring seamless development cycles.",
  },
};
