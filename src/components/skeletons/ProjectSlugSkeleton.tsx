"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectSlugSkeleton() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Back link */}
        <Skeleton className="h-5 w-40 bg-muted-foreground/20" />

        {/* Title */}
        <Skeleton className="h-10 w-3/4 sm:w-2/3 bg-muted-foreground/20 mx-auto" />

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-3">
          <Skeleton className="h-7 w-14 rounded-full bg-muted-foreground/15" />
          <Skeleton className="h-7 w-16 rounded-full bg-muted-foreground/15" />
          <Skeleton className="h-7 w-20 rounded-full bg-muted-foreground/15" />
          <Skeleton className="h-7 w-24 rounded-full bg-muted-foreground/15" />
          <Skeleton className="h-7 w-20 rounded-full bg-muted-foreground/15" />
        </div>

        {/* Project Image */}
        <Skeleton className="h-[400px] w-full rounded-xl bg-muted-foreground/10" />

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-6">
          <Skeleton className="h-10 w-40 rounded-full bg-muted-foreground/15" />
          <Skeleton className="h-10 w-40 rounded-full bg-muted-foreground/15" />
        </div>

        {/* Subsection (like BrewHaven Cafe title below main section) */}
        <div className="space-y-4 mt-16">
          <Skeleton className="h-8 w-2/3 sm:w-1/2 bg-muted-foreground/20 mx-auto" />
          <Skeleton className="h-[300px] w-full rounded-lg bg-muted-foreground/10" />
        </div>
      </div>
    </section>
  );
}
