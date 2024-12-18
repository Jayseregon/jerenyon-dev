"use client";

import { useEffect, useState } from "react";

import { BlogPostRefactor } from "@/src/interfaces/Hub";
import { getPublishedProjects } from "@/actions/prisma/blogPosts/action";
import { BlogPostsBoard } from "@/components/knowledge-hub/BlogPostsBoard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function ProjectsShowcaseBoardPage() {
  const [projects, setProjects] = useState<BlogPostRefactor[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPublishedProjects();

      if (data && data.length > 0) {
        setProjects(data);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Breadcrumbs />
      <BlogPostsBoard data={projects} />
    </div>
  );
}
