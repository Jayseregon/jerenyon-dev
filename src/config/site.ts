export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Jerenyon Dev",
  siteUrl: "https://www.jerenyon.dev",
  heroTitle: "Transforming Ideas Into Intelligent Solutions",
  heroSubtitle: "Web Development, Automation & Geospatial Expertise.",
  heroDescription:
    "Web Development, Automation & Geospatial Expertise. Providing Python automation and cloud-based geospatial solutions.",
  keywords: [
    "Web Development",
    "Geospatial Solutions",
    "GIS",
    "Python",
    "Python Automation",
    "Cloud Applications",
    "Next.js",
    "Data Processing",
    "Full Stack Development",
    "Geospatial Expertise",
    "Automation",
    "Backend Development",
    "Frontend Development",
    "Machine Learning",
    "Artificial Intelligence",
    "Retrieval-Augmented Generation",
    "RAG",
  ],
  icon: {
    dark: "/favicon-dark.webp",
    light: "/favicon-light.webp",
  },
  navItems: [
    {
      label: "about",
      href: "/about",
    },
    {
      label: "knowledge-hub",
      href: "/knowledge-hub",
    },
    {
      label: "estimate",
      href: "/estimate",
    },
    {
      label: "contact",
      href: "/contact",
    },
  ],
  hubCategories: [
    {
      label: "articles-and-tutorials",
      href: "/knowledge-hub",
      imgBg: "/assets/blogs-articles.jpg",
    },
    {
      label: "projects",
      href: "/knowledge-hub",
      imgBg: "/assets/projects.jpg",
    },
  ],
  links: {},
};
