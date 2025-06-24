
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getBlogBySlug, getBlogs, incrementBlogViews } from '@/lib/actions/blog.actions';
import BlogPostClient from '@/components/site/blog-post-client';
import type { IBlog } from '@/models/blog.model';
import { getIntro } from '@/lib/actions/intro.actions';


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
  const [blog, intro] = await Promise.all([
    getBlogBySlug(params.slug),
    getIntro()
  ]);

  if (!blog) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    };
  }

  const authorName = intro?.headline ?? 'Ganesh Tidke';

  return {
    title: `${blog.title} | ${authorName}`,
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
  await incrementBlogViews(params.slug);
  const blog: IBlog | null = await getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  return <BlogPostClient blog={blog} />;
}
