
import { Suspense } from 'react';
import { getBlogs } from '@/lib/actions/blog.actions';
import PagePlaceholder from '@/components/site/page-placeholder';
import BlogListClient from '@/components/site/blog-list-client';
import { BlogCardSkeleton } from '@/components/skeletons/blog-card-skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';


export async function generateMetadata(): Promise<Metadata> {
  const blogs = await getBlogs();

  const hasContent = blogs && blogs.length > 0;
  const description = hasContent
    ? "Explore the latest posts and insights from Ganesh Tidake’s blog — covering web development, SaaS, and modern technologies."
    : "Explore blogs about web development, SaaS, and Next.js. New posts coming soon.";

  return {
    title: "Blog | Ganesh Tidake",
    description,
    alternates: {
      canonical: "https://ganeshtidake.site/blog",
    },
    openGraph: {
      title: "Ganesh Tidake | Blog",
      description,
      url: "https://ganeshtidake.site/blog",
      siteName: "Ganesh Tidake Blog",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Ganesh Tidake Blog Cover",
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Ganesh Tidake Blog",
      description,
      images: ["/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

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
    // This case should be handled by the main page componentyyyyy
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
  const searchParamsBlog = await searchParams;
  const query =  searchParamsBlog?.query ?? '';
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
