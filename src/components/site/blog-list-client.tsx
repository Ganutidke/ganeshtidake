
'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '@/components/ui/input';
import { Search as SearchIcon } from 'lucide-react';
import FramerMotionWrapper from '@/components/site/framer-motion-wrapper';

export default function BlogListClient({ children }: { children: React.ReactNode }) {
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

        {children}
      </div>
    </FramerMotionWrapper>
  );
}
