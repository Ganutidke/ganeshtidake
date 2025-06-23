import { getBlogs } from '@/lib/actions/blog.actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PagePlaceholder from '@/components/site/page-placeholder';

export default async function BlogPage() {
  const blogs = await getBlogs();

  if (!blogs || blogs.length === 0) {
    return (
      <PagePlaceholder
        title="Blog"
        description="No blog posts found yet. Check back soon!"
      />
    );
  }

  return (
    <div className="container py-16">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold text-primary">From the Blog</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Sharing my thoughts on web development, AI, and more.
        </p>
      </div>

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
              <CardTitle className="p-6 pb-2 font-headline">
                <Link href={`/blog/${blog.slug}`} className="hover:text-primary transition-colors">
                  {blog.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0 flex-grow flex flex-col">
              <p className="text-muted-foreground line-clamp-3 flex-grow">
                {blog.content.substring(0, 150)}...
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
    </div>
  );
}
