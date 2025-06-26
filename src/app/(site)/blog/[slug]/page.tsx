import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  getBlogBySlug,
  getBlogs,
  incrementBlogViews,
  getRelatedBlogs,
} from "@/lib/actions/blog.actions";
import BlogPostClient from "@/components/site/blog-post-client";
import type { IBlog } from "@/models/blog.model";
import { getIntro } from "@/lib/actions/intro.actions";

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const blog = await getBlogBySlug(slug);
  if (!blog) {
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };
  }

  const intro = await getIntro();
  const authorName = intro?.headline ?? "Ganesh Tidke";
  const description = blog.content?.substring(0, 160) ?? "";

  return {
    title: `${blog.title} | ${authorName}`,
    description,
    keywords: blog.tags,
    openGraph: {
      title: blog.title,
      description,
      type: "article",
      url: `/blog/${blog.slug}`,
      images: blog.coverImage?.url
        ? [
            {
              url: blog.coverImage.url,
              width: 1200,
              height: 630,
              alt: blog.title,
            },
          ]
        : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const blog: IBlog | null = await getBlogBySlug(slug);
  if (!blog) {
    notFound();
  }

  await incrementBlogViews(slug);
  const relatedBlogs = await getRelatedBlogs({
    blogId: blog._id as string,
    tags: blog.tags,
  });

  return <BlogPostClient blog={blog} relatedBlogs={relatedBlogs} />;
}
