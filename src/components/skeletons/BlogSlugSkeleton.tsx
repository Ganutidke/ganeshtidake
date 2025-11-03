"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function BlogSlugSkeleton() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Back link */}
        <Skeleton className="h-5 w-32 bg-muted-foreground/20" />

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          <Skeleton className="h-6 w-14 rounded-full bg-muted-foreground/15" />
          <Skeleton className="h-6 w-16 rounded-full bg-muted-foreground/15" />
          <Skeleton className="h-6 w-20 rounded-full bg-muted-foreground/15" />
          <Skeleton className="h-6 w-24 rounded-full bg-muted-foreground/15" />
        </div>

        {/* Title */}
        <Skeleton className="h-10 w-3/4 sm:w-2/3 mx-auto bg-muted-foreground/20" />

        {/* Meta info (date + views) */}
        <div className="flex justify-center items-center gap-4">
          <Skeleton className="h-4 w-28 bg-muted-foreground/15" />
          <Skeleton className="h-4 w-20 bg-muted-foreground/15" />
        </div>

        {/* Cover image */}
        <Skeleton className="h-[380px] w-full rounded-xl bg-muted-foreground/10" />

        {/* Blog content title (like H2) */}
        <Skeleton className="h-8 w-2/3 sm:w-1/2 bg-muted-foreground/20 mx-auto mt-10" />

        {/* Blog content placeholder */}
        <div className="space-y-3 mt-6">
          <Skeleton className="h-4 w-full bg-muted-foreground/10" />
          <Skeleton className="h-4 w-[95%] bg-muted-foreground/10" />
          <Skeleton className="h-4 w-[90%] bg-muted-foreground/10" />
          <Skeleton className="h-4 w-[80%] bg-muted-foreground/10" />
          <Skeleton className="h-4 w-[85%] bg-muted-foreground/10" />
        </div>
      </div>
    </section>
  );
}
