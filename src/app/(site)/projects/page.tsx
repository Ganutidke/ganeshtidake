
import { Suspense } from 'react';
import { getProjects } from '@/lib/actions/project.actions';
import { getProjectCategories } from '@/lib/actions/project-category.actions';
import PagePlaceholder from '@/components/site/page-placeholder';
import ProjectsPageClient from '@/components/site/projects-page-client';
import FramerMotionWrapper from '@/components/site/framer-motion-wrapper';
import { ProjectCardSkeleton } from '@/components/skeletons/project-card-skeleton';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Projects | Ganesh Tidake",
  description:
    "Explore the latest web applications, SaaS products, and modern UI projects built by Ganesh Tidake using Next.js, React, and Tailwind CSS.",
  alternates: {
    canonical: "https://ganeshtidake.site/projects",
  },
  openGraph: {
    title: "Projects by Ganesh Tidake",
    description:
      "Discover creative web projects, SaaS solutions, and full-stack applications developed by Ganesh Tidake.",
    url: "https://ganeshtidake.site/projects",
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

async function ProjectsGrid({ query, category }: { query: string; category: string }) {
  const projects = await getProjects({ query, category });

  if (!projects || projects.length === 0) {
    return (
      <div className="mt-12">
        <PagePlaceholder
          title="No projects found"
          description="Try adjusting your search or filter."
        />
      </div>
    );
  }

  return (
    <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <FramerMotionWrapper key={project._id as string} delay={index * 0.1}>
          <Link href={`/projects/${project.slug}`} className="block group h-full">
            <div className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
              <div className="relative h-56 w-full shrink-0">
                <Image
                  src={project.coverImage.url}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-grow flex-col p-4">
                <h3 className="font-bold text-lg text-foreground flex items-center gap-1 group-hover:text-primary transition-colors">
                  {project.title}
                  <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-muted-foreground mt-1">{project.category}</p>
              </div>
            </div>
          </Link>
        </FramerMotionWrapper>
      ))}
    </div>
  );
}

function ProjectsGridSkeleton() {
  return (
    <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default async function ProjectsPage({ searchParams }: { searchParams?: { query?: string; category?: string } }) {
  const resolvedParams = await searchParams;
  const query = resolvedParams?.query ?? '';
  const category = resolvedParams?.category ?? 'All';
  const categories = await getProjectCategories();

  // Check for initial empty state
  const initialProjects = await getProjects({ query: '', category: 'All' });
  if (!initialProjects || initialProjects.length === 0) {
     return (
      <PagePlaceholder
        title="My Projects"
        description="No projects found yet. Check back soon!"
      />
    );
  }

  return (
    <ProjectsPageClient categories={categories}>
      <Suspense key={query + category} fallback={<ProjectsGridSkeleton />}>
        <ProjectsGrid query={query} category={category} />
      </Suspense>
    </ProjectsPageClient>
  );
}
