"use client";

import { useState, useMemo } from "react";
import { Search as SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import FramerMotionWrapper from "./framer-motion-wrapper";
import type { IProjectCategory } from "@/models/project-category.model";
import type { PopulatedProject } from "@/models/project.model";
import ProjectCard from "./project-card";
import { motion, AnimatePresence } from "framer-motion";
import PagePlaceholder from "./page-placeholder";

interface ProjectsPageClientProps {
  categories: IProjectCategory[];
  initialProjects: PopulatedProject[];
}

export default function ProjectsPageClient({
  categories,
  initialProjects,
}: ProjectsPageClientProps) {
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryChange = (category: string) => {
    if (category === "All") {
      setActiveCategories([]);
    } else {
      setActiveCategories((prev) =>
        prev.includes(category)
          ? prev.filter((c) => c !== category)
          : [...prev, category]
      );
    }
  };

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      // Filter by search query
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // Filter by categories
      const matchesCategory =
        activeCategories.length === 0 ||
        activeCategories.some((cat) => project.category.includes(cat));

      return matchesSearch && matchesCategory;
    });
  }, [initialProjects, searchQuery, activeCategories]);

  const allCategory = { _id: "all", name: "All" };
  const allCategories = [allCategory, ...categories];

  return (
    <div className="container max-w-7xl mx-auto px-4 py-16">
      <FramerMotionWrapper>
        <div className="text-center">
          <h1 className="font-headline text-4xl font-bold text-primary">
            My Creative Works
          </h1>
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </FramerMotionWrapper>

      <FramerMotionWrapper delay={0.2}>
        <div className="flex justify-center flex-wrap gap-2 mt-8">
          {allCategories.map((category) => {
            const isActive =
              category.name === "All"
                ? activeCategories.length === 0
                : activeCategories.includes(category.name);
            return (
              <Button
                key={category._id}
                variant={isActive ? "default" : "outline"}
                onClick={() => handleCategoryChange(category.name)}
                className={cn(
                  "rounded-full transition-all duration-300",
                  isActive && "bg-primary text-primary-foreground"
                )}
              >
                {category.name}
              </Button>
            );
          })}
        </div>
      </FramerMotionWrapper>

      <div className="mt-12 min-h-[400px]">
        {filteredProjects.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project._id as string}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12"
          >
            <PagePlaceholder
              title="No projects found"
              description="Try adjusting your search or filter."
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
