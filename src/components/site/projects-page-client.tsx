
'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { ArrowUpRight, Search as SearchIcon } from 'lucide-react';

import type { PopulatedProject } from '@/models/project.model';
import type { IProjectCategory } from '@/models/project-category.model';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import FramerMotionWrapper from './framer-motion-wrapper';

interface ProjectsPageClientProps {
  projects: PopulatedProject[];
  categories: IProjectCategory[];
}

export default function ProjectsPageClient({ projects, categories }: ProjectsPageClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || 'All';

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category === 'All') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };
  
  const allCategory = { _id: 'all', name: 'All' };
  const allCategories = [allCategory, ...categories];

  return (
      <div className="container max-w-7xl mx-auto px-4 py-16">
        <FramerMotionWrapper>
          <div className="text-center">
            <h1 className="font-headline text-4xl font-bold text-primary">My Creative Works</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              A collection of projects I've built.
            </p>
          </div>
        </FramerMotionWrapper>

        <FramerMotionWrapper delay={0.1}>
          <div className="relative mt-8 max-w-md mx-auto">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for projects..."
              className="pl-10 h-11"
              onChange={(e) => handleSearch(e.target.value)}
              defaultValue={searchParams.get('query')?.toString()}
            />
          </div>
        </FramerMotionWrapper>
        
        <FramerMotionWrapper delay={0.2}>
          <div className="flex justify-center flex-wrap gap-2 mt-8">
            {allCategories.map((category) => (
              <Button
                key={category._id}
                variant={currentCategory === category.name ? 'default' : 'outline'}
                onClick={() => handleCategoryChange(category.name)}
                className={cn(
                    "rounded-full",
                    currentCategory === category.name && "bg-primary text-primary-foreground"
                )}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </FramerMotionWrapper>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <FramerMotionWrapper key={project._id as string} delay={index * 0.1}>
               <Link href={`/projects/${project.slug}`} className="block group h-full">
                  <div className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                       <div className="relative h-56 w-full shrink-0">
                          <Image
                          src={project.coverImage.url}
                          alt={project.title}
                          fill
                          className="object-cover"
                          />
                      </div>
                      <div className="flex flex-grow flex-col p-4">
                          <h3 className="font-bold text-lg text-foreground flex items-center gap-1 group-hover:text-primary transition-colors">
                              {project.title}
                              <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </h3>
                          <p className="text-muted-foreground mt-1">{project.category}</p>
                      </div>
                  </div>
               </Link>
            </FramerMotionWrapper>
          ))}
        </div>
      </div>
  );
};
