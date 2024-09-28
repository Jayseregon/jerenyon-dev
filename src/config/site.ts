export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Jerenyon Dev",
  heroTitle: "Process Automation & Web Development",
  heroDescription:
    "Dive into the world of Jayseregon, where technology meets creativity. Explore projects that blend innovative coding with aesthetic design to solve real-world problems.",
  code: "Currently in development",
  icon: "/favicon.png",
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
