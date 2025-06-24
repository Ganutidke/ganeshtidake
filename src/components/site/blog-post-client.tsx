
'use client';

import Image from 'next/image';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { ArrowLeft, Eye } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import FramerMotionWrapper from '@/components/site/framer-motion-wrapper';
import type { IBlog } from '@/models/blog.model';

export default function BlogPostClient({ blog }: { blog: IBlog }) {
  return (
    <FramerMotionWrapper>
      <article className="max-w-4xl mx-auto py-12 px-4">
        <div className="mb-8">
          <Button asChild variant="link" className="p-0 text-muted-foreground hover:text-primary">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>

        <div className="space-y-4 text-center">
          <div className="flex flex-wrap justify-center gap-2">
              {blog.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
          </div>
          <h1 className="font-headline text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground">
            {blog.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-muted-foreground">
            <p>{format(new Date(blog.createdAt), 'MMMM d, yyyy')}</p>
            <span className="text-muted-foreground">&middot;</span>
            <p className="flex items-center gap-1.5">
              <Eye className="h-4 w-4" />
              {blog.views.toLocaleString()} views
            </p>
          </div>
        </div>

        <div className="relative my-8 h-64 md:h-96 w-full">
          <Image
            src={blog.coverImage.url}
            alt={blog.title}
            fill
            className="rounded-lg object-cover shadow-lg"
            priority
          />
        </div>

        <div className="prose prose-invert prose-lg mx-auto max-w-none 
            prose-headings:text-foreground prose-headings:font-headline
            prose-a:text-primary hover:prose-a:text-primary/80
            prose-strong:text-foreground
            prose-blockquote:border-l-primary
            prose-code:bg-muted prose-code:text-foreground prose-code:p-1 prose-code:rounded-md
            prose-pre:bg-muted
            ">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{blog.content}</ReactMarkdown>
        </div>
      </article>
    </FramerMotionWrapper>
  );
}
