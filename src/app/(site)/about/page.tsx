
import { getAbout } from '@/lib/actions/about.actions';
import { getEducationHistory } from '@/lib/actions/education.actions';
import { getExperienceHistory } from '@/lib/actions/experience.actions';
import { getIntro } from '@/lib/actions/intro.actions';
import { getProjects } from '@/lib/actions/project.actions';
import FramerMotionWrapper from '@/components/site/framer-motion-wrapper';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github, Linkedin, Mail, Briefcase, Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

export default async function AboutPage() {
  const intro = await getIntro();
  const about = await getAbout();
  const experienceHistory = await getExperienceHistory();
  const educationHistory = await getEducationHistory();
  const projects = (await getProjects()).slice(0, 3);

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
    <main className="container max-w-3xl mx-auto px-4 py-16 sm:py-24">
        <FramerMotionWrapper>
            <section className="flex flex-col sm:flex-row items-start gap-8">
                <div className="relative h-24 w-24 sm:h-32 sm:w-32 flex-shrink-0">
                    <Image
                        src={about.profilePicture.url}
                        alt={intro.headline}
                        fill
                        className="object-cover rounded-full"
                    />
                </div>
                <div className="flex-grow">
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">{intro.headline}</h1>
                    <p className="mt-2 text-lg text-muted-foreground">{intro.role}</p>
                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                        {intro.githubUrl && (
                            <Button asChild variant="link" className="p-0 h-auto">
                                <Link href={intro.githubUrl} target="_blank"><Github className="mr-2"/> GitHub</Link>
                            </Button>
                        )}
                        {intro.linkedinUrl && (
                             <Button asChild variant="link" className="p-0 h-auto">
                                <Link href={intro.linkedinUrl} target="_blank"><Linkedin className="mr-2"/> LinkedIn</Link>
                            </Button>
                        )}
                         {intro.email && (
                             <Button asChild variant="link" className="p-0 h-auto">
                                <Link href={`mailto:${intro.email}`}><Mail className="mr-2"/> Email</Link>
                            </Button>
                        )}
                    </div>
                </div>
                 <Button asChild>
                    <Link href={`mailto:${intro.email}`}>
                        <Calendar className="mr-2 h-4 w-4"/>
                        Schedule a call
                    </Link>
                </Button>
            </section>
        </FramerMotionWrapper>

        <FramerMotionWrapper className="mt-16">
             <p className="text-lg text-muted-foreground leading-relaxed">{about.bio}</p>
        </FramerMotionWrapper>

        {experienceHistory.length > 0 && (
            <FramerMotionWrapper className="mt-20">
                <section>
                    <h2 className="text-2xl font-bold text-primary mb-8">Work Experience</h2>
                    <div className="relative pl-6">
                        <div className="absolute left-0 top-2 h-full w-0.5 bg-border -translate-x-1/2"></div>
                        {experienceHistory.map((exp, index) => (
                            <div key={exp._id} className="relative mb-12 pl-8">
                                <div className="absolute -left-1.5 top-1 h-4 w-4 rounded-full bg-primary border-4 border-background"></div>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-lg text-foreground">{exp.role}</h3>
                                        <p className="text-md text-muted-foreground">{exp.company}</p>
                                    </div>
                                    <p className="text-sm text-muted-foreground flex-shrink-0 ml-4">
                                        {format(new Date(exp.startDate), 'yyyy')} - {exp.endDate ? format(new Date(exp.endDate), 'yyyy') : 'Present'}
                                    </p>
                                </div>
                                {exp.description && (
                                    <ul className="mt-4 list-disc list-inside text-muted-foreground space-y-2">
                                        {exp.description.split('\n').filter(Boolean).map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                )}
                                {index === 0 && (
                                     <Image src="https://placehold.co/600x400.png" data-ai-hint="tech ui" alt="Work highlight" width={500} height={250} className="mt-4 rounded-lg border border-border" />
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </FramerMotionWrapper>
        )}

        {educationHistory.length > 0 && (
            <FramerMotionWrapper className="mt-20">
                <section>
                    <h2 className="text-2xl font-bold text-primary mb-8">Studies</h2>
                    <div className="space-y-6">
                        {educationHistory.map((edu) => (
                            <div key={edu._id}>
                                <h3 className="font-bold text-lg text-foreground">{edu.school}</h3>
                                <p className="text-muted-foreground">{edu.degree}, {edu.fieldOfStudy}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </FramerMotionWrapper>
        )}

        {projects.length > 0 && (
            <FramerMotionWrapper className="mt-20">
                <section>
                    <h2 className="text-2xl font-bold text-primary mb-8">Technical Skills</h2>
                     <div className="space-y-12">
                        {projects.map((project) => (
                            <div key={project._id}>
                                <h3 className="font-bold text-lg text-foreground">{project.title}</h3>
                                <p className="text-muted-foreground mt-1 line-clamp-2">{project.description}</p>
                                <div className="mt-4 flex flex-wrap gap-4">
                                    <div className="w-full sm:w-1/2">
                                        <Image
                                            src={project.coverImage.url}
                                            alt={project.title}
                                            width={500}
                                            height={281}
                                            className="rounded-lg border border-border object-cover aspect-video"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </FramerMotionWrapper>
        )}
    </main>
  );
}
