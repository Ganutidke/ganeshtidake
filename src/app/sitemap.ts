import { getProjects } from "@/lib/actions/project.actions";
import { getBlogs } from "@/lib/actions/blog.actions";
import { getCertificates } from "@/lib/actions/certificate.actions";
import { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/utils";

const baseUrl = BASE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch dynamic data
  const [projects, blogs, certificates] = await Promise.all([
    getProjects(),
    getBlogs(),
    getCertificates(),
  ]);

  // Static routes (pages)
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/certificates`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];

  // Dynamic Projects
  const projectPages: MetadataRoute.Sitemap = projects?.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: project.updatedAt || project.createdAt || new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  })) || [];

  // Dynamic Blogs
  const blogPages: MetadataRoute.Sitemap = blogs?.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: blog.updatedAt || blog.createdAt || new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  })) || [];

  // Dynamic Certificates
  const certificatePages: MetadataRoute.Sitemap = certificates?.map((cert) => ({
    url: `${baseUrl}/certificates`,
    changeFrequency: "daily",
    priority: 0.6,
  })) || [];

  // Merge all URLs
  return [...staticPages, ...projectPages, ...blogPages, ...certificatePages];
}
