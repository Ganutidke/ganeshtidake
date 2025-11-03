"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { BlogCardSkeleton } from "./blog-card-skeleton";

export default function BlogSectionSkeleton() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-6">
        {/* Heading */}
        <Skeleton className="h-8 w-56 sm:w-64 bg-muted-foreground/20" />

        {/* Subheading */}
        <Skeleton className="h-5 w-[340px] sm:w-[420px] md:w-[520px] bg-muted-foreground/15" />

        {/* Search Bar */}
        <div className="mt-4 w-full max-w-md">
          <Skeleton className="h-12 w-full rounded-full bg-muted-foreground/10" />
        </div>

        {/* Blog Cards Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          <BlogCardSkeleton />
          <BlogCardSkeleton />
          <BlogCardSkeleton />
          <BlogCardSkeleton />
          <BlogCardSkeleton />
          <BlogCardSkeleton />
        </div>
      </div>
    </section>
  );
}
