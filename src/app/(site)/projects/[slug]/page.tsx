
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

import { getProjectBySlug, getProjects, getRelatedProjects } from '@/lib/actions/project.actions';
import ProjectDetailClient from '@/components/site/project-detail-client';
import type { PopulatedProject } from '@/models/project.model';


type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    };
  }

  return {
    title: `${project.title} | Project`,
    description: project.description.substring(0, 160),
    keywords: project.tags,
    openGraph: {
      title: project.title,
      description: project.description.substring(0, 160),
      type: 'article',
      url: `/projects/${project.slug}`,
      images: [
        {
          url: project.coverImage.url,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const project: PopulatedProject | null = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = await getRelatedProjects({ projectId: project._id, category: project.category });

  return <ProjectDetailClient project={project} relatedProjects={relatedProjects} />;
}
