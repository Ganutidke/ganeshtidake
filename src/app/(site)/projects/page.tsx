
import { Suspense } from 'react';
import { getProjects } from '@/lib/actions/project.actions';
import { getProjectCategories } from '@/lib/actions/project-category.actions';
import PagePlaceholder from '@/components/site/page-placeholder';
import ProjectsPageClient from '@/components/site/projects-page-client';
import FramerMotionWrapper from '@/components/site/framer-motion-wrapper';
import { ProjectCardSkeleton } from '@/components/skeletons/project-card-skeleton';
import { Metadata } from 'next';
import { BASE_URL } from '@/lib/utils';
import ProjectCard from '@/components/site/project-card';

export const metadata: Metadata = {
  title: "Projects ",
  description:
    "Explore the latest web applications, SaaS products, and modern UI projects built by Ganesh Tidake using Next.js, React, and Tailwind CSS.",
  alternates: {
    canonical: `${BASE_URL}/projects`,
  },
  openGraph: {
    title: "Projects by Ganesh Tidake",
    description:
      "Discover creative web projects, SaaS solutions, and full-stack applications developed by Ganesh Tidake.",
    url: `${BASE_URL}/projects`,
    siteName: "Ganesh Tidake Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ganesh Tidake Portfolio Projects",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Ganesh Tidake",
    description:
      "Explore the portfolio of Ganesh Tidake – building scalable, aesthetic, and modern web apps.",
    images: ["/og-image.png"],
  },
  keywords: [
    "Ganesh Tidake Projects",
    "Next.js Projects",
    "React.js Projects",
    "Web Developer Portfolio",
    "Frontend Projects",
    "Full Stack Developer",
    "SaaS Builder",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export default async function ProjectsPage() {
  const categories = await getProjectCategories();
  const projects = await getProjects({ category: 'All' });

  return (
    <ProjectsPageClient categories={categories} initialProjects={projects} />
  );
}
