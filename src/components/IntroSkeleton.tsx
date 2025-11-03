"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function IntroSkeleton() {
  return (
    <section className="relative flex min-h-[90vh] flex-col max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8 py-20 font-display bg-background text-foreground overflow-hidden">
      <div className=" flex flex-col  space-y-6">
        {/* Small greeting: "Hey there!, I’m" */}
        <Skeleton className="h-6 w-48 md:h-14 sm:w-56 lg:w-72 bg-muted-foreground/20" />

        {/* Name: "Ganesh Tidake" */}
        <Skeleton className="h-[72px] sm:h-[88px] lg:h-[120px] xl:h-[150px] w-[280px] sm:w-[400px] md:w-[520px] lg:w-[640px] xl:w-[860px]  rounded-md bg-muted-foreground/15" />

        {/* Subtitle lines */}
        <div className="space-y-3 mt-2 flex flex-col items-start">
          <Skeleton className="h-5 w-[260px] sm:w-[320px] md:w-[420px] bg-muted-foreground/20" />
          <Skeleton className="h-5 w-[310px] sm:w-[380px] md:w-[500px] bg-muted-foreground/10" />
        </div>

        {/* Role badge */}
        <div className="mt-8 flex justify-start">
          <Skeleton className="h-9 w-44 rounded-full bg-muted-foreground/15" />
        </div>

        {/* Social buttons */}
        <div className="mt-10 flex flex-wrap justify-start gap-4">
          <Skeleton className="h-10 w-24 rounded-full bg-muted-foreground/10" />
          <Skeleton className="h-10 w-28 rounded-full bg-muted-foreground/10" />
          <Skeleton className="h-10 w-24 rounded-full bg-muted-foreground/10" />
        </div>
      </div>
    </section>
  );
}
