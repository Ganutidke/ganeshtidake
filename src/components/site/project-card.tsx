"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { PopulatedProject } from "@/models/project.model";

interface ProjectCardProps {
    project: PopulatedProject;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Link href={`/projects/${project.slug}`} className="block group h-full">
            <motion.div className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                <motion.div className="relative h-56 w-full shrink-0">
                    <Image
                        src={project.coverImage.url}
                        alt={project.title}
                        fill
                        className="object-cover"
                    />
                </motion.div>
                <motion.div className="flex flex-grow flex-col p-4">
                    <motion.h3 className="font-bold text-lg text-foreground flex items-center gap-1 group-hover:text-primary transition-colors">
                        {project.title}
                        <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.h3>
                    <motion.p className="text-muted-foreground mt-1">
                        {Array.isArray(project.category) ? project.category.join(", ") : project.category}
                    </motion.p>
                </motion.div>
            </motion.div>
        </Link>
    );
}
