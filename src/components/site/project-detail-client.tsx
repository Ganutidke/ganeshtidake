"use client";

import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Github, ExternalLink, ArrowLeft } from "lucide-react";
import FramerMotionWrapper from "@/components/site/framer-motion-wrapper";
import type { PopulatedProject } from "@/models/project.model";
import { Card, CardContent } from "@/components/ui/card";

export default function ProjectDetailClient({
  project,
  relatedProjects,
}: {
  project: PopulatedProject;
  relatedProjects: PopulatedProject[];
}) {
  return (
    <FramerMotionWrapper>
      <article className="max-w-4xl mx-auto py-12 px-4">
        <div className="mb-8">
          <Button
            asChild
            variant="link"
            className="p-0 text-muted-foreground hover:text-primary"
          >
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Projects
            </Link>
          </Button>
        </div>
        <div className="space-y-4 text-center">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground">
            {project.title}
          </h1>
          <div className="flex flex-wrap justify-center gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
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

        <div className="my-8 flex justify-between gap-4">
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

        <div
          className="prose prose-invert prose-lg mx-auto max-w-none 
            prose-headings:text-foreground prose-headings:font-headline
            prose-a:text-primary hover:prose-a:text-primary/80
            prose-strong:text-foreground
            prose-blockquote:border-l-primary
            prose-code:bg-muted prose-code:text-foreground prose-code:p-1 prose-code:rounded-md
            prose-pre:bg-muted
            "
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {project.description}
          </ReactMarkdown>
        </div>

        {relatedProjects && relatedProjects.length > 0 && (
          <div className="mt-16 pt-8 border-t">
            <h2 className="text-2xl font-bold text-center mb-8 text-primary">
              Related Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.map((relatedProject) => (
                <Card
                  key={relatedProject._id as string}
                  className="group overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <Link
                    href={`/projects/${relatedProject.slug}`}
                    className="block"
                  >
                    <div className="relative h-48 w-full">
                      <Image
                        src={relatedProject.coverImage.url}
                        alt={relatedProject.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {relatedProject.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {relatedProject.category}
                      </p>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        )}
      </article>
    </FramerMotionWrapper>
  );
}
