
import { Suspense } from 'react';
import { getBlogs } from '@/lib/actions/blog.actions';
import PagePlaceholder from '@/components/site/page-placeholder';
import BlogListClient from '@/components/site/blog-list-client';
import { BlogCardSkeleton } from '@/components/skeletons/blog-card-skeleton';
import FramerMotionWrapper from '@/components/site/framer-motion-wrapper';
import { IBlog } from '@/models/blog.model';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { ArrowRight } from 'lucide-react';


async function BlogGrid({ query }: { query: string }) {
  const blogs = await getBlogs({ query });

  if (!blogs || blogs.length === 0) {
    if (query) {
      return (
        <div className="mt-12">
          <PagePlaceholder
            title="No blog posts found"
            description="Try adjusting your search."
          />
        </div>
      );
    }
    // This case should be handled by the main page component
    return null;
  }

  return (
    <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <Card key={blog._id as string} className="transform overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-primary/20 hover:shadow-lg flex flex-col">
          <CardHeader className="p-0">
            <Link href={`/blog/${blog.slug}`} className="block">
              <div className="relative h-48 w-full">
                <Image
                  src={blog.coverImage.url}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>
            </Link>
          </CardHeader>
          <CardContent className="p-6 pt-4 flex-grow flex flex-col">
            <CardTitle className="font-headline text-xl mb-1 leading-tight">
              <Link href={`/blog/${blog.slug}`} className="hover:text-primary transition-colors line-clamp-2">
                {blog.title}
              </Link>
            </CardTitle>
            <p className="text-sm text-muted-foreground mb-3 mt-1">
              {format(new Date(blog.createdAt), 'MMMM d, yyyy')}
            </p>
            <p className="text-muted-foreground line-clamp-3 flex-grow">
              {blog.excerpt}
            </p>
            <Button asChild variant="link" className="mt-4 p-0 self-start">
              <Link href={`/blog/${blog.slug}`}>
                Read More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function BlogGridSkeleton() {
  return (
    <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  )
}

export default async function BlogPage({ searchParams }: { searchParams?: { query?: string } }) {
  const query = searchParams?.query || '';
  const initialBlogs = await getBlogs({});

  if (!initialBlogs || initialBlogs.length === 0) {
     return (
      <PagePlaceholder
        title="Blog"
        description="No blog posts found yet. Check back soon!"
      />
    );
  }

  return (
    <BlogListClient>
      <Suspense key={query} fallback={<BlogGridSkeleton />}>
        <BlogGrid query={query} />
      </Suspense>
    </BlogListClient>
  );
}
