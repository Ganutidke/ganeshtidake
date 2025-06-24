
'use client';

import { useState } from 'react';
import type { IIntro } from '@/models/intro.model';
import type { IAbout } from '@/models/about.model';
import type { IExperience } from '@/models/experience.model';
import type { IEducation } from '@/models/education.model';
import FramerMotionWrapper from '@/components/site/framer-motion-wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, Linkedin, Mail, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

interface AboutPageClientProps {
  intro: IIntro | null;
  about: IAbout | null;
  experienceHistory: IExperience[];
  educationHistory: IEducation[];
}

export default function AboutPageClient({ intro, about, experienceHistory, educationHistory }: AboutPageClientProps) {
    const [showAllEducation, setShowAllEducation] = useState(false);
    const visibleEducation = showAllEducation ? educationHistory : educationHistory.slice(0, 2);

    const getSkillCategories = (skillsString?: string) => {
        if (typeof skillsString !== 'string' || !skillsString) {
            return [];
        }
        return skillsString.split('\n').filter(Boolean).map(line => {
            const [category, skillsStr] = line.split(':');
            if (!category || !skillsStr) return null;
            const skills = skillsStr.split(',').map(s => s.trim()).filter(Boolean);
            return { category: category.trim(), skills };
        }).filter((category): category is { category: string; skills: string[] } => category !== null);
    }

    const skillCategories = getSkillCategories(about?.skills);

    if (!intro || !about) {
        return (
            <div className="container py-16 text-center">
                <h1 className="font-headline text-4xl font-bold text-primary">About Page Not Configured</h1>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                    Please configure the Intro and About sections in the admin panel.
                </p>
            </div>
        );
    }

    return (
        <main className="container max-w-4xl mx-auto px-4 py-16 sm:py-24 space-y-24">
            <FramerMotionWrapper>
                <section className="flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left">
                    <div className="relative h-32 w-32 sm:h-40 sm:w-40 flex-shrink-0">
                        <Image
                            src={about.profilePicture.url}
                            alt={intro.headline}
                            fill
                            className="object-cover rounded-full shadow-lg"
                        />
                    </div>
                    <div className="flex-grow">
                        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">{intro.headline}</h1>
                        <p className="mt-2 text-xl text-primary font-semibold">{intro.role}</p>
                        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{about.bio}</p>
                        <div className="mt-6 flex flex-wrap gap-4 justify-center sm:justify-start">
                            {intro.githubUrl && (
                                <Button asChild variant="outline">
                                    <Link href={intro.githubUrl} target="_blank"><Github /> GitHub</Link>
                                </Button>
                            )}
                            {intro.linkedinUrl && (
                                <Button asChild variant="outline">
                                    <Link href={intro.linkedinUrl} target="_blank"><Linkedin /> LinkedIn</Link>
                                </Button>
                            )}
                             {intro.email && (
                                 <Button asChild>
                                    <Link href={`mailto:${intro.email}`}><Mail /> Contact Me</Link>
                                </Button>
                            )}
                        </div>
                    </div>
                </section>
            </FramerMotionWrapper>

            {skillCategories.length > 0 && (
                <FramerMotionWrapper>
                    <section>
                        <h2 className="text-3xl font-bold text-primary text-center mb-12">Technical Skills</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {skillCategories.map((category, index) => (
                            <FramerMotionWrapper key={category.category} delay={index * 0.1}>
                                <Card className="bg-card/50 h-full">
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-bold text-foreground mb-4">{category.category}</h3>
                                        <div className="flex flex-wrap gap-2">
                                        {category.skills.map((skill) => (
                                            <Badge key={skill} variant="secondary">{skill}</Badge>
                                        ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </FramerMotionWrapper>
                            ))}
                        </div>
                    </section>
                </FramerMotionWrapper>
            )}

            {experienceHistory.length > 0 && (
                <FramerMotionWrapper>
                    <section>
                        <h2 className="text-3xl font-bold text-primary text-center mb-12">Work Experience</h2>
                        <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-full before:w-0.5 before:bg-border">
                            {experienceHistory.map((exp, index) => (
                                <div key={exp._id} className="relative mb-12 pl-8">
                                    <div className="absolute -left-[7px] top-1.5 h-4 w-4 rounded-full bg-primary border-4 border-background"></div>
                                    <p className="text-sm text-muted-foreground">
                                        {format(new Date(exp.startDate), 'MMM yyyy')} - {exp.endDate ? format(new Date(exp.endDate), 'MMM yyyy') : 'Present'}
                                    </p>
                                    <h3 className="font-bold text-xl text-foreground mt-1">{exp.role}</h3>
                                    <p className="text-md text-primary font-semibold">{exp.company}</p>
                                    {exp.description && (
                                        <p className="mt-2 text-muted-foreground">
                                            {exp.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                </FramerMotionWrapper>
            )}

            {educationHistory.length > 0 && (
                <FramerMotionWrapper>
                    <section>
                        <h2 className="text-3xl font-bold text-primary text-center mb-12">Studies</h2>
                        <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-full before:w-0.5 before:bg-border">
                            {visibleEducation.map((edu, index) => (
                                <div key={edu._id} className="relative mb-8 pl-8">
                                    <div className="absolute -left-[7px] top-1.5 h-4 w-4 rounded-full bg-primary border-4 border-background"></div>
                                     <p className="text-sm text-muted-foreground">
                                        {format(new Date(edu.startDate), 'MMM yyyy')} - {edu.endDate ? format(new Date(edu.endDate), 'MMM yyyy') : 'Present'}
                                    </p>
                                    <h3 className="font-bold text-xl text-foreground mt-1">{edu.school}</h3>
                                    <p className="text-md text-primary font-semibold">{edu.degree}, {edu.fieldOfStudy}</p>
                                </div>
                            ))}
                        </div>
                        {educationHistory.length > 2 && (
                            <div className="text-center mt-8">
                                <Button variant="outline" onClick={() => setShowAllEducation(!showAllEducation)}>
                                    {showAllEducation ? (
                                        <>
                                            <ChevronUp className="mr-2 h-4 w-4" />
                                            Show Less
                                        </>
                                    ) : (
                                        <>
                                            <ChevronDown className="mr-2 h-4 w-4" />
                                            Show More
                                        </>
                                    )}
                                </Button>
                            </div>
                        )}
                    </section>
                </FramerMotionWrapper>
            )}
        </main>
    );
}
