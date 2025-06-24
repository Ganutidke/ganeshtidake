
import { Suspense } from 'react';
import { getBlogs } from '@/lib/actions/blog.actions';
import PagePlaceholder from '@/components/site/page-placeholder';
import BlogListClient from '@/components/site/blog-list-client';
import { BlogCardSkeleton } from '@/components/skeletons/blog-card-skeleton';
import FramerMotionWrapper from '@/components/site/framer-motion-wrapper';
import { Skeleton } from '@/components/ui/skeleton';

async function BlogList({ query }: { query: string }) {
  const blogs = await getBlogs({ query });

  if (!blogs || blogs.length === 0) {
    if (query) {
      return (
        <PagePlaceholder
          title="No blog posts found"
          description="Try adjusting your search."
        />
      );
    }
    return (
      <PagePlaceholder
        title="Blog"
        description="No blog posts found yet. Check back soon!"
      />
    );
  }

  return <BlogListClient blogs={blogs} />;
}

function BlogPageSkeleton() {
  return (
    <FramerMotionWrapper>
      <div className="container max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <div className="w-1/3 h-10 mx-auto bg-muted animate-pulse rounded-md" />
          <div className="w-2/3 max-w-2xl h-12 mx-auto mt-4 bg-muted animate-pulse rounded-md" />
        </div>

        <div className="max-w-md mx-auto mt-8">
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </FramerMotionWrapper>
  )
}


export default function BlogPage({ searchParams }: { searchParams?: { query?: string } }) {
  const query = searchParams?.query || '';
  return (
    <Suspense key={query} fallback={<BlogPageSkeleton />}>
      <BlogList query={query} />
    </Suspense>
  );
}
