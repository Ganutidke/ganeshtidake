"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { ProjectCardSkeleton } from "./project-card-skeleton";

export default function ProjectsSectionSkeleton() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-6">
        {/* Heading */}
        <Skeleton className="h-8 w-64 sm:w-72 bg-muted-foreground/20" />

        {/* Subheading */}
        <Skeleton className="h-5 w-[360px] sm:w-[440px] md:w-[540px] bg-muted-foreground/15" />

        {/* Search bar */}
        <div className="mt-4 w-full max-w-md">
          <Skeleton className="h-12 w-full rounded-full bg-muted-foreground/10" />
        </div>

        {/* Filter buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Skeleton className="h-9 w-14 rounded-full bg-muted-foreground/15" />
          <Skeleton className="h-9 w-20 rounded-full bg-muted-foreground/15" />
          <Skeleton className="h-9 w-32 rounded-full bg-muted-foreground/15" />
          <Skeleton className="h-9 w-36 rounded-full bg-muted-foreground/15" />
        </div>

        {/* Project cards grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
        </div>
      </div>
    </section>
  );
}
