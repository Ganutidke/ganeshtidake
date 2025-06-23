import { notFound } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { getBlogBySlug, getBlogs } from '@/lib/actions/blog.actions';
import { Badge } from '@/components/ui/badge';

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    };
  }

  return {
    title: `${blog.title} | Ganesh Tidke`,
    description: blog.content.substring(0, 160),
    openGraph: {
      title: blog.title,
      description: blog.content.substring(0, 160),
      type: 'article',
      url: `/blog/${blog.slug}`,
      images: [
        {
          url: blog.coverImage.url,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto py-12">
      <div className="space-y-4 text-center">
        <div className="flex flex-wrap justify-center gap-2">
            {blog.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
        </div>
        <h1 className="font-headline text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground">
          {blog.title}
        </h1>
        <p className="text-muted-foreground">
          {format(new Date(blog.createdAt), 'MMMM d, yyyy')}
        </p>
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
  );
}
