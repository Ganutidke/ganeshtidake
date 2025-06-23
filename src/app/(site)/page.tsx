
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Github, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getIntro } from '@/lib/actions/intro.actions';
import { getAbout } from '@/lib/actions/about.actions';
import { getProjects } from '@/lib/actions/project.actions';
import { getBlogs } from '@/lib/actions/blog.actions';
import { getCertificates } from '@/lib/actions/certificate.actions';
import { getEducationHistory } from '@/lib/actions/education.actions';
import { format } from 'date-fns';

export default async function HomePage() {
  const intro = await getIntro();
  const about = await getAbout();
  const projects = await getProjects();
  const blogs = await getBlogs();
  const certificates = await getCertificates();
  const educationHistory = await getEducationHistory();

  const highlightedProjects = projects.slice(0, 3);
  const blogTeasers = blogs.slice(0, 3);
  const highlightedCerts = certificates.slice(0, 3);
  const recentEducation = educationHistory.slice(0, 2);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-6xl lg:text-7xl">
            {intro?.headline ?? 'Hi, I’m Ganesh Tidke'}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
            {intro?.subheadline ?? 'A passionate Full-Stack Developer creating modern and responsive web applications.'}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/projects">
                View My Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Contact Me</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Me Preview */}
      {about && (
        <section className="bg-card py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              <div className="relative mx-auto h-80 w-80 rounded-full shadow-lg overflow-hidden">
                <Image
                  src={about.profilePicture.url}
                  alt="Ganesh Tidke"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <h2 className="font-headline text-3xl font-bold text-primary">About Me</h2>
                <p className="mt-4 text-lg text-muted-foreground line-clamp-4">
                  {about.bio}
                </p>
                <Button asChild variant="link" className="mt-4 text-lg p-0">
                  <Link href="/about">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Highlighted Projects */}
      {highlightedProjects.length > 0 && (
        <section className="py-20 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-center font-headline text-3xl font-bold text-primary">Highlighted Projects</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
              A glimpse into the innovative solutions I've brought to life.
            </p>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {highlightedProjects.map((project) => (
                <Card key={project._id as string} className="flex flex-col transform overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-primary/20 hover:shadow-lg">
                  <CardHeader className="p-0">
                    <Link href={`/projects/${project.slug}`} className="block">
                      <div className="relative h-48 w-full">
                        <Image
                          src={project.coverImage.url}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>
                  </CardHeader>
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <CardTitle className="font-headline mb-2">
                       <Link href={`/projects/${project.slug}`} className="hover:text-primary transition-colors">{project.title}</Link>
                    </CardTitle>
                    <p className="text-muted-foreground line-clamp-3 flex-grow">{project.description}</p>
                    <div className="mt-4 flex items-center gap-2">
                        {project.repositoryUrl && (
                            <Button asChild variant="outline" size="sm">
                                <Link href={project.repositoryUrl} target="_blank"><Github className="h-4 w-4" /></Link>
                            </Button>
                        )}
                        {project.liveUrl && (
                            <Button asChild size="sm">
                                <Link href={project.liveUrl} target="_blank">View Live<ExternalLink className="ml-2 h-4 w-4" /></Link>
                            </Button>
                        )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button asChild size="lg">
                <Link href="/projects">See All Projects</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

       {/* Blog Teasers */}
       {blogTeasers.length > 0 && (
          <section className="bg-card py-20 md:py-24">
            <div className="container mx-auto px-4">
              <h2 className="text-center font-headline text-3xl font-bold text-primary">From the Blog</h2>
              <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
                Sharing my thoughts on web development, AI, and more.
              </p>
              <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {blogTeasers.map((blog) => (
                  <Card key={blog._id as string} className="transform overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-primary/20 hover:shadow-lg flex flex-col">
                    <CardHeader className="p-0">
                      <Link href={`/blog/${blog.slug}`} className="block">
                        <div className="relative h-48 w-full">
                          <Image
                            src={blog.coverImage.url}
                            alt={blog.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </Link>
                    </CardHeader>
                    <CardContent className="p-6 flex-grow flex flex-col">
                        <CardTitle className="p-0 pb-2 font-headline">
                            <Link href={`/blog/${blog.slug}`} className="hover:text-primary transition-colors">{blog.title}</Link>
                        </CardTitle>
                      <p className="text-muted-foreground line-clamp-3 flex-grow">{blog.content.substring(0, 150)}...</p>
                      <Button asChild variant="link" className="mt-4 p-0 self-start">
                        <Link href={`/blog/${blog.slug}`}>
                          Read More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-12 text-center">
                <Button asChild size="lg">
                  <Link href="/blog">Read All Blogs</Link>
                </Button>
              </div>
            </div>
          </section>
        )}

      {/* Education Preview */}
      {recentEducation.length > 0 && (
        <section className="py-20 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-center font-headline text-3xl font-bold text-primary">My Education</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
              A brief overview of my academic background.
            </p>
            <div className="mt-12 max-w-3xl mx-auto space-y-8">
              {recentEducation.map((edu) => (
                <Card key={edu._id as string}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="font-headline text-xl text-primary">{edu.degree}</CardTitle>
                        <p className="font-semibold">{edu.school}</p>
                        <p className="text-muted-foreground">{edu.fieldOfStudy}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-semibold text-secondary">
                          {format(new Date(edu.startDate), 'yyyy')} - {edu.endDate ? format(new Date(edu.endDate), 'yyyy') : 'Present'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button asChild size="lg">
                <Link href="/education">View Full Education</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Certificates / Achievements */}
      {highlightedCerts.length > 0 && (
        <section className="bg-card py-20 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-center font-headline text-3xl font-bold text-primary">Certificates & Achievements</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
              Proudly showcasing my certified skills and accomplishments.
            </p>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {highlightedCerts.map((cert) => (
                <Card key={cert._id as string} className="flex flex-col items-center justify-center p-6 text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-primary/20 hover:shadow-lg">
                   <div className="relative h-32 w-48 mb-4">
                      <Image
                        src={cert.coverImage.url}
                        alt={cert.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <CardTitle className="font-headline text-xl">{cert.title}</CardTitle>
                    <p className="text-muted-foreground mt-2">Issued by: {cert.issuingOrganization}</p>
                </Card>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button asChild size="lg">
                <Link href="/certificates">View All Certifications</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
            <h2 className="font-headline text-3xl font-bold text-primary">Interested in working with me?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Let's connect and discuss how we can create something amazing together. Reach out and let's start the conversation.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/contact">
                Get in Touch
              </Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
