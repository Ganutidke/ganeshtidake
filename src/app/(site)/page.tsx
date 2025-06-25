
import { Suspense } from 'react';
import { getIntro } from '@/lib/actions/intro.actions';
import { getAbout } from '@/lib/actions/about.actions';
import { getProjects } from '@/lib/actions/project.actions';
import { getBlogs } from '@/lib/actions/blog.actions';
import { getEducationHistory } from '@/lib/actions/education.actions';
import { getExperienceHistory } from '@/lib/actions/experience.actions';
import { getFaqs } from '@/lib/actions/faq.actions';

import FramerMotionWrapper from '@/components/site/framer-motion-wrapper';
import { ProjectCardSkeleton } from '@/components/skeletons/project-card-skeleton';
import { BlogCardSkeleton } from '@/components/skeletons/blog-card-skeleton';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Github, Linkedin, Mail, Briefcase, Zap, Newspaper, GraduationCap, HelpCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import type { IIntro } from '@/models/intro.model';
import type { IAbout } from '@/models/about.model';
import type { PopulatedProject } from '@/models/project.model';
import type { IBlog } from '@/models/blog.model';

// --- Data Fetching Components ---

async function ProjectsSection() {
  const projects = (await getProjects()).slice(0, 3);
  if (projects.length === 0) return null;

  return (
    <section>
      <FramerMotionWrapper>
        <h2 className="text-2xl font-bold text-primary">All Creative Works.</h2>
        <p className="mt-2 text-muted-foreground">Here's some of my projects that I have worked on.</p>
        <Link href="/projects" className="mt-2 inline-flex items-center gap-1 text-primary hover:underline">
            Explore more <ArrowRight className="h-4 w-4"/>
        </Link>
      </FramerMotionWrapper>
      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
           <FramerMotionWrapper key={project._id as string} delay={index * 0.1}>
              <Link href={`/projects/${project.slug}`} className="block group">
                  <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                      <div className="relative h-56 w-full">
                          <Image src={project.coverImage.url} alt={project.title} fill className="object-cover" />
                      </div>
                  </div>
                  <div className="mt-4">
                      <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
                      <p className="text-muted-foreground mt-1">{project.category}</p>
                  </div>
              </Link>
          </FramerMotionWrapper>
        ))}
      </div>
    </section>
  );
}

async function ExperienceSection() {
  const experienceHistory = (await getExperienceHistory()).slice(0, 2);
  if (experienceHistory.length === 0) return null;

  return (
    <FramerMotionWrapper>
      <section>
        <h2 className="text-2xl font-bold text-primary mb-8 text-center">Work Experience</h2>
        <div className="relative">
           <div className="absolute left-1/2 h-full w-0.5 bg-border -translate-x-1/2 hidden md:block"></div>
          {experienceHistory.map((exp, index) => (
            <FramerMotionWrapper key={exp._id as string} delay={index * 0.1}>
              <div className="relative mb-12 md:flex items-center md:justify-center">
                  <div className={`md:w-1/2 w-full ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'}`}>
                      <div className="p-6 rounded-lg shadow-lg bg-card text-left">
                          <p className="text-sm font-semibold text-primary">
                              {format(new Date(exp.startDate), 'MMM yyyy')} - {exp.endDate ? format(new Date(exp.endDate), 'MMM yyyy') : 'Present'}
                          </p>
                          <h3 className="text-xl font-bold font-headline mt-1 text-foreground">{exp.role}</h3>
                          <h4 className="text-lg font-semibold">{exp.company}</h4>
                      </div>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background hidden md:block"></div>
              </div>
            </FramerMotionWrapper>
          ))}
           <div className="text-center">
              <Button asChild>
                  <Link href="/experience">
                      View All Experience <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
              </Button>
          </div>
        </div>
      </section>
    </FramerMotionWrapper>
  );
}

async function CombinedSection() {
  const [blogs, educationHistory, faqs] = await Promise.all([
    getBlogs().then(res => res.slice(0, 3)),
    getEducationHistory().then(res => res.slice(0, 2)),
    getFaqs().then(res => res.slice(0, 4))
  ]);

  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {blogs.length > 0 && (
          <div className="lg:col-span-2">
            <FramerMotionWrapper>
              <div className="flex items-center justify-between mb-8">
                <h2 className="flex items-center gap-2 text-2xl font-bold text-primary">
                  <Newspaper className="h-6 w-6"/> Latest Articles
                </h2>
                <Link href="/blog" className="flex items-center gap-1 text-sm text-primary hover:underline">
                  View all articles <ArrowRight className="h-4 w-4"/>
                </Link>
              </div>
            </FramerMotionWrapper>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogs.map((blog: IBlog, index) => (
                <FramerMotionWrapper key={blog._id as string} delay={index * 0.1}>
                  <Card className="group relative overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
                    <Link href={`/blog/${blog.slug}`} className="absolute inset-0 z-10" aria-label={blog.title}></Link>
                    <div className="relative h-40 w-full overflow-hidden">
                      <Image src={blog.coverImage.url} alt={blog.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{blog.title}</h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        {format(new Date(blog.createdAt), 'MMMM d, yyyy')}
                      </p>
                    </CardContent>
                  </Card>
                </FramerMotionWrapper>
              ))}
            </div>
          </div>
        )}
        
        {educationHistory.length > 0 && (
          <div className="lg:col-span-1">
            <FramerMotionWrapper>
              <h2 className="flex items-center gap-2 text-2xl font-bold text-primary mb-8">
                <GraduationCap className="h-6 w-6"/> Education
              </h2>
            </FramerMotionWrapper>
            <div className="space-y-8 relative">
              <div className="absolute left-3 top-2 h-[calc(100%-2.5rem)] w-0.5 bg-border -z-10"></div>
              {educationHistory.map((edu, index) => (
                <FramerMotionWrapper key={edu._id as string} delay={index * 0.1}>
                  <div className="pl-10 relative">
                    <div className="absolute left-0 top-1.5 h-4 w-4 rounded-full bg-primary border-4 border-background"></div>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(edu.startDate), 'MMM yyyy')} - {edu.endDate ? format(new Date(edu.endDate), 'MMM yyyy') : 'Present'}
                    </p>
                    <h3 className="font-bold text-foreground mt-1">{edu.school}</h3>
                    <p className="text-muted-foreground text-sm">{edu.degree}, {edu.fieldOfStudy}</p>
                  </div>
                </FramerMotionWrapper>
              ))}
              <FramerMotionWrapper delay={educationHistory.length * 0.1}>
                <div className="pl-10">
                  <Button asChild variant="link" className="p-0 text-primary">
                    <Link href="/education">
                      View Full Journey <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </FramerMotionWrapper>
            </div>
          </div>
        )}
      </section>

      {faqs.length > 0 && (
        <FramerMotionWrapper>
          <section>
            <h2 className="flex items-center justify-center gap-2 text-2xl font-bold text-primary mb-8">
              <HelpCircle className="h-6 w-6"/> Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <FramerMotionWrapper key={faq._id} delay={index * 0.1}>
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger className="text-lg text-left hover:text-primary transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </FramerMotionWrapper>
              ))}
            </Accordion>
            <div className="text-center mt-8">
              <Button asChild variant="outline">
                <Link href="/faq">
                  View All FAQs <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </section>
        </FramerMotionWrapper>
      )}
    </>
  );
}


// --- Skeleton Components ---

function ProjectsSectionSkeleton() {
  return (
    <section>
      <FramerMotionWrapper>
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-5 w-1/2 mt-3" />
        <Skeleton className="h-6 w-1/4 mt-4" />
      </FramerMotionWrapper>
      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => <ProjectCardSkeleton key={i} />)}
      </div>
    </section>
  );
}

function ExperienceSectionSkeleton() {
  return (
    <section>
      <Skeleton className="h-8 w-1/2 mx-auto mb-8" />
      <div className="relative">
        <div className="absolute left-1/2 h-full w-0.5 bg-border -translate-x-1/2 hidden md:block"></div>
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="relative mb-12 md:flex items-center justify-center">
            <div className={`md:w-1/2 w-full ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
              <Card className="p-6">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-6 w-2/3 mt-2" />
                <Skeleton className="h-5 w-1/2 mt-1" />
              </Card>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CombinedSectionSkeleton() {
  return (
     <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
            <FramerMotionWrapper>
              <div className="flex items-center justify-between mb-8">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-5 w-32" />
              </div>
            </FramerMotionWrapper>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Array.from({ length: 2 }).map((_, index) => (
                    <BlogCardSkeleton key={index} />
                ))}
            </div>
        </div>
        <div className="lg:col-span-1">
            <FramerMotionWrapper>
              <Skeleton className="h-8 w-40 mb-8" />
            </FramerMotionWrapper>
            <div className="space-y-8 relative">
                {Array.from({ length: 2 }).map((_, index) => (
                    <div key={index} className="pl-10 relative">
                        <Skeleton className="h-4 w-3/4 mb-1" />
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-4 w-2/3 mt-1" />
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}

// --- Main Page Component ---
export default async function HomePage() {
  const intro = await getIntro();
  const about = await getAbout();

  const getSkillCategories = (skillsString?: string) => {
    if (typeof skillsString !== 'string' || !skillsString) return [];
    return skillsString.split('\n').filter(Boolean).map(line => {
      const [category, skillsStr] = line.split(':');
      if (!category || !skillsStr) return null;
      const skills = skillsStr.split(',').map(s => s.trim()).filter(Boolean);
      return { category: category.trim(), skills };
    }).filter((category): category is { category: string; skills: string[] } => category !== null);
  };

  const skillCategories = getSkillCategories(about?.skills);

  return (
    <div className="container max-w-7xl mx-auto px-4 flex flex-col gap-24 sm:gap-32">
      <FramerMotionWrapper>
        <section className="grid grid-cols-1 gap-8 pt-12 md:pt-20">
          <div>
            <h1 className="text-6xl font-bold tracking-tight text-foreground sm:text-8xl">{intro?.headline ?? 'Your Name'}</h1>
            <p className="mt-4 text-2xl text-primary font-semibold">{intro?.role ?? 'Full-Stack Developer'}</p>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{intro?.subheadline ?? 'A passionate developer creating modern and responsive web applications.'}</p>
            <div className="mt-8 flex gap-4">
              {intro?.githubUrl && <Button asChild variant="outline"><Link href={intro.githubUrl} target="_blank"><Github /> Github</Link></Button>}
              {intro?.linkedinUrl && <Button asChild variant="outline"><Link href={intro.linkedinUrl} target="_blank"><Linkedin /> LinkedIn</Link></Button>}
              {intro?.email && <Button asChild variant="outline"><Link href={`mailto:${intro.email}`}><Mail /> Email</Link></Button>}
            </div>
          </div>
        </section>
      </FramerMotionWrapper>

      {about && (
        <FramerMotionWrapper>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
              <div className="md:col-span-2">
                  <h2 className="flex items-center gap-2 text-2xl font-bold text-primary"><Zap className="h-6 w-6"/> About Me</h2>
                  <div className="mt-4 prose prose-invert max-w-none text-muted-foreground space-y-4">
                    <p className="line-clamp-6">{about.bio}</p>
                  </div>
                  <Button asChild variant="link" className="p-0 mt-4 text-primary">
                    <Link href="/about">Read More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
              </div>
              <div className="relative mx-auto h-64 w-64 md:h-80 md:w-80">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 blur-2xl transform -translate-x-10 -translate-y-10"></div>
                  <div className="absolute inset-0 rounded-full bg-card border border-border" style={{backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)`, backgroundSize: `1rem 1rem`}}></div>
                  <Image src={about.profilePicture.url} alt={intro?.headline ?? 'Profile Picture'} fill className="object-cover rounded-full p-2" />
              </div>
          </section>
        </FramerMotionWrapper>
      )}

      {skillCategories.length > 0 && (
        <section>
          <FramerMotionWrapper>
            <h2 className="text-2xl font-bold text-primary text-center">My Skills</h2>
          </FramerMotionWrapper>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <FramerMotionWrapper key={category.category} delay={index * 0.1}>
                <Card className="bg-card/50">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-4">{category.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => ( <Badge key={skill} variant="secondary">{skill}</Badge> ))}
                    </div>
                  </CardContent>
                </Card>
              </FramerMotionWrapper>
            ))}
          </div>
        </section>
      )}

      <Suspense fallback={<ProjectsSectionSkeleton />}>
        <ProjectsSection />
      </Suspense>

      <Suspense fallback={<ExperienceSectionSkeleton />}>
          <ExperienceSection />
      </Suspense>
      
      <Suspense fallback={<CombinedSectionSkeleton />}>
        <CombinedSection />
      </Suspense>

      <FramerMotionWrapper>
        <section className="text-center">
              <h2 className="text-4xl font-bold text-foreground">Keep In Touch.</h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">I'm currently open for new opportunities. Feel free to get in touch and talk more about your projects.</p>
              <div className="mt-8 flex justify-center gap-4">
                  {intro?.linkedinUrl && <Button asChild variant="outline"><Link href={intro.linkedinUrl} target="_blank"><Linkedin /> LinkedIn</Link></Button>}
                  {intro?.email && <Button asChild><a href={`mailto:${intro.email}`}><Mail /> Email</a></Button>}
              </div>
        </section>
      </FramerMotionWrapper>
    </div>
  );
}
