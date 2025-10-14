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

export const dynamic = "force-dynamic";


export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  const intro = await getIntro();

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "The article you are looking for does not exist.",
      robots: { index: false, follow: true },
    };
  }

  const authorName = intro?.headline || "Guest Author";
  const cleanDescription =
    blog.excerpt ||
    blog.content?.slice(0, 160).replace(/<[^>]+>/g, "") ||
    "A detailed post about modern web development and technology trends.";
    console.log("published at", blog.createdAt);
  return {
    title: `${blog.title} | ${authorName}`,
    description: cleanDescription,
    alternates: {
      canonical: `https://ganeshtidake.site/blog/${blog.slug}`,
    },
    keywords: blog.tags?.length
      ? blog.tags
      : ["Blog", "Web Development", "SaaS", "Next.js"],
    openGraph: {
      title: blog.title,
      description: cleanDescription,
      url: `https://ganeshtidake.site/blog/${blog.slug}`,
      siteName: "Ganesh Tidake Blog",
      type: "article",
      publishedTime: blog.createdAt
        ? typeof blog.createdAt === "string"
          ? blog.createdAt
          : blog.createdAt.toISOString()
        : undefined,
      modifiedTime: blog.updatedAt
        ? typeof blog.updatedAt === "string"
          ? blog.updatedAt
          : blog.updatedAt.toISOString()
        : undefined,
      images: [
        {
          url: blog.coverImage?.url || "/og-image.png",
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      authors: [authorName],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: cleanDescription,
      images: [blog.coverImage?.url || "/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
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
