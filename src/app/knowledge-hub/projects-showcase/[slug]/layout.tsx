import { Metadata } from "next";
import { headers } from "next/headers";

import { siteConfig } from "@/config/site";
import { getSinglePost } from "@/actions/prisma/blogPosts/action";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getSinglePost(slug);
  const headersList = await headers();
  const origin = headersList.get("host") || "";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${origin}`;

  if (!post) return {};

  return {
    title: `${post.title} | ${siteConfig.name}`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `${baseUrl}/knowledge-hub/projects-showcase/${post.slug}`,
      siteName: siteConfig.name,
      images: [
        {
          url:
            post.coverImage || `${baseUrl}/assets/thumbnail-placeholder.webp`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "en_US",
      type: "article",
      authors: [post.author],
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [
        post.coverImage || `${baseUrl}/assets/thumbnail-placeholder.webp`,
      ],
    },
  };
}

export default function ProjectsShowcaseReaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
