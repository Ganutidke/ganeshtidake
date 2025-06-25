
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getBlogBySlug, getBlogs, incrementBlogViews, getRelatedBlogs } from '@/lib/actions/blog.actions';
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
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    };
  }
  
  const intro = await getIntro();
  const authorName = intro?.headline ?? 'Ganesh Tidke';
  const description = blog.content?.substring(0, 160) ?? '';

  return {
    title: `${blog.title} | ${authorName}`,
    description: description,
    keywords: blog.tags,
    openGraph: {
      title: blog.title,
      description: description,
      type: 'article',
      url: `/blog/${blog.slug}`,
      images: blog.coverImage?.url ? [
        {
          url: blog.coverImage.url,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const blog: IBlog | null = await getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  await incrementBlogViews(params.slug);
  
  const relatedBlogs = await getRelatedBlogs({ blogId: blog._id, tags: blog.tags });

  return <BlogPostClient blog={blog} relatedBlogs={relatedBlogs} />;
}
