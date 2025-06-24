
import { Suspense } from 'react';
import { getProjects } from '@/lib/actions/project.actions';
import { getProjectCategories } from '@/lib/actions/project-category.actions';
import PagePlaceholder from '@/components/site/page-placeholder';
import ProjectsPageClient from '@/components/site/projects-page-client';
import FramerMotionWrapper from '@/components/site/framer-motion-wrapper';
import { ProjectCardSkeleton } from '@/components/skeletons/project-card-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

async function ProjectsList() {
  const [projects, categories] = await Promise.all([
    getProjects(),
    getProjectCategories()
  ]);

  if (!projects || projects.length === 0) {
    return (
      <PagePlaceholder
        title="My Projects"
        description="No projects found yet. Check back soon!"
      />
    );
  }

  return <ProjectsPageClient projects={projects} categories={categories} />;
}

function ProjectsPageSkeleton() {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-16">
      <FramerMotionWrapper>
        <div className="text-center">
          <Skeleton className="h-10 w-1/2 mx-auto" />
          <Skeleton className="h-6 w-2/3 mx-auto mt-4" />
        </div>
      </FramerMotionWrapper>
      
      <FramerMotionWrapper delay={0.2}>
        <div className="flex justify-center flex-wrap gap-2 mt-12">
          <Skeleton className="h-9 w-16 rounded-full" />
          <Skeleton className="h-9 w-24 rounded-full" />
          <Skeleton className="h-9 w-32 rounded-full" />
        </div>
      </FramerMotionWrapper>

      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<ProjectsPageSkeleton />}>
      <ProjectsList />
    </Suspense>
  );
}
