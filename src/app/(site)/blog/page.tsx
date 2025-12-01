
import { Suspense } from 'react';
import { getBlogs } from '@/lib/actions/blog.actions';
import PagePlaceholder from '@/components/site/page-placeholder';
import BlogListClient from '@/components/site/blog-list-client';
import { BlogCardSkeleton } from '@/components/skeletons/blog-card-skeleton';
import { Metadata } from 'next';
<<<<<<< Updated upstream

=======
import { BASE_URL } from '@/lib/utils';
import BlogCard from '@/components/site/blog-card';
>>>>>>> Stashed changes

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

// Cache this route for a short time so repeated navigations are faster
export const revalidate = 60;

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
      {blogs.map((blog, index) => (
        <BlogCard key={blog._id as string} blog={blog} index={index} />
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
