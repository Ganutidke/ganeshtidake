
import { getProjects } from '@/lib/actions/project.actions';
import PagePlaceholder from '@/components/site/page-placeholder';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Github, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default async function ProjectsPage() {
  const projects = await getProjects();

  if (!projects || projects.length === 0) {
    return (
      <PagePlaceholder
        title="Projects"
        description="No projects found yet. Add some from the admin panel!"
      />
    );
  }

  return (
    <div className="container py-16">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold text-primary">My Projects</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Here are some of the projects I've worked on.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project._id as string} className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-primary/20 hover:shadow-lg">
            <CardHeader className="p-0">
              <div className="relative h-48 w-full">
                <Image
                  src={project.coverImage.url}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            </CardHeader>
            <CardContent className="p-6 flex-grow flex flex-col">
              <CardTitle className="font-headline mb-2">{project.title}</CardTitle>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
              </div>
              <p className="text-muted-foreground flex-grow">
                {project.description}
              </p>
              <div className="mt-4 flex items-center gap-2">
                {project.repositoryUrl && (
                    <Button asChild variant="outline" size="sm">
                        <Link href={project.repositoryUrl} target="_blank">
                            <Github className="mr-2 h-4 w-4" />
                            GitHub
                        </Link>
                    </Button>
                )}
                {project.liveUrl && (
                    <Button asChild size="sm">
                        <Link href={project.liveUrl} target="_blank">
                            Live Demo
                            <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
