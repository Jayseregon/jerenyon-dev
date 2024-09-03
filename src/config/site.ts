export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Jayseregon",
  heroTitle: "Showcasing the Digital Craftsmanship",
  heroDescription:
    "Dive into the world of Jayseregon, where technology meets creativity. Explore projects that blend innovative coding with aesthetic design to solve real-world problems.",
  code: "Currently in development",
  icon: "/favicon.png",
  navItems: [
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Resume",
      href: "/resume",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Code Snippets",
      href: "/code-snippets",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ],
  navMenuToggleItems: [
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Resume",
      href: "/resume",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Code Snippets",
      href: "/code-snippets",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "Contact",
      href: "/contact",
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
  Contact: {
    h1_title: "Contact",
    subtitle: "Future contact form to get in touch with me.",
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
