
'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Search as SearchIcon } from 'lucide-react';
import FramerMotionWrapper from '@/components/site/framer-motion-wrapper';
import type { IBlog } from '@/models/blog.model';
import { format } from 'date-fns';

export default function BlogListClient({ blogs }: { blogs: IBlog[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <FramerMotionWrapper>
      <div className="container max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="font-headline text-4xl font-bold text-primary">From the Blog</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Sharing my thoughts on web development, AI, and more.
          </p>
        </div>

        <div className="relative mt-8 max-w-md mx-auto">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for articles..."
            className="pl-10 h-11"
            onChange={(e) => handleSearch(e.target.value)}
            defaultValue={searchParams.get('query')?.toString()}
          />
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
      </div>
    </FramerMotionWrapper>
  );
}
