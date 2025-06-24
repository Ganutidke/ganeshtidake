
'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { PopulatedProject } from '@/models/project.model';
import type { IProjectCategory } from '@/models/project-category.model';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProjectsPageClientProps {
  projects: PopulatedProject[];
  categories: IProjectCategory[];
}

export default function ProjectsPageClient({ projects, categories }: ProjectsPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') {
      return projects;
    }
    return projects.filter(
      (project) => project.category === selectedCategory
    );
  }, [selectedCategory, projects]);
  
  const allCategory = { _id: 'all', name: 'All' };
  const allCategories = [allCategory, ...categories];

  return (
    <div className="container max-w-7xl mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold text-primary">My Creative Works</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          A collection of projects I've built.
        </p>
      </div>
      
      <div className="flex justify-center flex-wrap gap-2 mt-12">
        {allCategories.map((category) => (
          <Button
            key={category._id}
            variant={selectedCategory === category.name ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category.name)}
            className={cn(
                "rounded-full",
                selectedCategory === category.name && "bg-primary text-primary-foreground"
            )}
          >
            {category.name}
          </Button>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <div key={project._id as string}>
             <Link href={`/projects/${project.slug}`} className="block group">
                <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                     <div className="relative h-56 w-full">
                        <Image
                        src={project.coverImage.url}
                        alt={project.title}
                        fill
                        className="object-cover"
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <h3 className="font-bold text-lg text-foreground flex items-center gap-1 group-hover:text-primary transition-colors">
                        {project.title}
                        <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-muted-foreground mt-1">{project.category}</p>
                </div>
             </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
