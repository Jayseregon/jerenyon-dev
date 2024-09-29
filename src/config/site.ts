export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Jerenyon Dev",
  siteUrl: "https://www.jerenyon.dev",
  heroTitle: "Transforming Ideas Into Intelligent Solutions",
  heroSubtitle: "Web Development, Geospatial Expertise & Automation.",
  heroDescription:
    "Web Development, Geospatial Expertise & Automation. Providing Python automation and cloud-based geospatial solutions.",
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
    dark: "/favicon-dark.png",
    light: "/favicon-light.png",
  },
  navItems: [
    // {
    //   label: "About",
    //   href: "/about",
    // },
    {
      label: "resume",
      href: "/resume",
    },
    // {
    //   label: "Projects",
    //   href: "/projects",
    // },
    // {
    //   label: "Code Snippets",
    //   href: "/code-snippets",
    // },
    // {
    //   label: "Blog",
    //   href: "/blog",
    // },
    {
      label: "contact",
      href: "/contact",
    },
    {
      label: "pricing",
      href: "/pricing",
    },
  ],
  links: {},
  About: {
    h1_title: "About",
    subtitle: "This page will contain information about me.",
  },
  Blog: {
    h1_title: "Blog",
    subtitle: "Optional page, if I have something to share.",
  },
  CodeSnippet: {
    h1_title: "Code Snippet",
    subtitle:
      "This page could contains snippets and examples of overcame challenges.",
  },
  Projects: {
    h1_title: "Projects",
    subtitle: "This page will contain relevant projects I have worked on.",
  },
  Resume: {
    h1_title: "Resume",
    subtitle: "This would hold my resume and professional experience.",
  },
};
