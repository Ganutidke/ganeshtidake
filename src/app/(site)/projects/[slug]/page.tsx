import { notFound } from "next/navigation";
import { Metadata } from "next";

import {
  getProjectBySlug,
  getProjects,
  getRelatedProjects,
} from "@/lib/actions/project.actions";
import ProjectDetailClient from "@/components/site/project-detail-client";
import type { PopulatedProject } from "@/models/project.model";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Ganesh Tidake",
      description: "The project you are looking for does not exist.",
    };
  }

  const shortDesc = project.description
    ? project.description.substring(0, 160)
    : "Explore this project by Ganesh Tidake.";

  return {
    title: `${project.title}`,
    description: shortDesc,
    alternates: {
      canonical: `https://ganeshtidake.site/projects/${slug}`,
    },
    keywords: [
      project.title,
      "Ganesh Tidake Project",
      "Next.js Project",
      "React Project",
      "Full Stack Development",
      ...(project.tags || []),
    ],
    openGraph: {
      title: project.title,
      description: shortDesc,
      url: `https://ganeshtidake.site/projects/${slug}`,
      siteName: "Ganesh Tidake Portfolio",
      type: "article",
      images: [
        {
          url: project.coverImage.url,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: shortDesc,
      images: [project.coverImage.url],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const resolvedParams = await params;

  const project: PopulatedProject | null = await getProjectBySlug(
    resolvedParams.slug
  );

  if (!project) {
    notFound();
  }

  const relatedProjects = await getRelatedProjects({
    projectId: project._id as string,
    category: project.category,
  });

  return (
    <ProjectDetailClient project={project} relatedProjects={relatedProjects} />
  );
}
