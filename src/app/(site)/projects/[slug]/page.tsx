
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { getProjectBySlug, getProjects } from '@/lib/actions/project.actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Github, ExternalLink } from 'lucide-react';

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
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto py-12 px-4">
      <div className="space-y-4 text-center">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground">
          {project.title}
        </h1>
        <div className="flex flex-wrap justify-center gap-2">
          {project.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
        </div>
      </div>

      <div className="relative my-8 h-64 md:h-96 w-full">
        <Image
          src={project.coverImage.url}
          alt={project.title}
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
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.description}</ReactMarkdown>
      </div>

      <div className="mt-8 flex justify-center gap-4">
        {project.repositoryUrl && (
          <Button asChild variant="outline">
            <Link href={project.repositoryUrl} target="_blank">
              <Github className="mr-2 h-4 w-4" />
              GitHub Repository
            </Link>
          </Button>
        )}
        {project.liveUrl && (
          <Button asChild>
            <Link href={project.liveUrl} target="_blank">
              View Live Demo
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>
    </article>
  );
}
