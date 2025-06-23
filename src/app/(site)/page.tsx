import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Github, Linkedin, Mail, ExternalLink, Briefcase, Zap, Newspaper } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getIntro } from '@/lib/actions/intro.actions';
import { getAbout } from '@/lib/actions/about.actions';
import { getProjects } from '@/lib/actions/project.actions';
import { getBlogs } from '@/lib/actions/blog.actions';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

export default async function HomePage() {
  const intro = await getIntro();
  const about = await getAbout();
  const projects = (await getProjects()).slice(0, 4);
  const blogs = (await getBlogs()).slice(0, 4);

  return (
    <div className="flex flex-col gap-24 sm:gap-32">
      {/* Hero Section */}
      <section className="grid grid-cols-1 gap-8 pt-12 md:pt-20">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-primary md:text-5xl">
            Hey there!, I’m
          </h1>
          <h2 className="mt-2 text-6xl font-bold tracking-tight text-foreground sm:text-8xl">
            {intro?.headline ?? 'Ganesh Tidke.'}
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            {intro?.subheadline ?? 'A self-taught developer with an interest in Computer Science.'}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Briefcase className="h-5 w-5 text-primary"/>
                <span>Frontend Engineer</span>
              </div>
          </div>
          <div className="mt-8 flex gap-4">
            <Button asChild variant="outline">
              <Link href="#" target="_blank">
                <Github /> Github
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="#" target="_blank">
                <Linkedin /> LinkedIn
              </Link>
            </Button>
             <Button asChild variant="outline">
              <Link href="mailto:ganeshtidke1@example.com">
                <Mail /> Email
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Me Preview */}
      {about && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            <div className="md:col-span-2">
                <h2 className="flex items-center gap-2 text-2xl font-bold text-primary">
                    <Zap className="h-6 w-6"/> About Me
                </h2>
                <div className="mt-4 prose prose-invert max-w-none text-muted-foreground space-y-4">
                   <p className="line-clamp-6">
                     {about.bio}
                   </p>
                </div>
                 <Button asChild variant="link" className="p-0 mt-4 text-primary">
                  <Link href="/about">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
            </div>
            <div className="relative mx-auto h-64 w-64 md:h-80 md:w-80">
                 <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 blur-2xl transform -translate-x-10 -translate-y-10"></div>
                 <div className="absolute inset-0 rounded-full bg-card border border-border" 
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)`,
                        backgroundSize: `1rem 1rem`
                    }}>
                </div>
                <Image
                  src={about.profilePicture.url}
                  alt="Ganesh Tidke"
                  fill
                  className="object-cover rounded-full p-2"
                />
            </div>
        </section>
      )}

      {/* Creative Works (Projects) */}
      {projects.length > 0 && (
        <section>
            <h2 className="text-2xl font-bold text-primary">All Creative Works.</h2>
            <p className="mt-2 text-muted-foreground">Here's some of my projects that I have worked on.</p>
            <Link href="/projects" className="mt-2 inline-flex items-center gap-1 text-primary hover:underline">
                Explore more <ArrowRight className="h-4 w-4"/>
            </Link>

            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {projects.map((project) => (
                <Card key={project._id as string} className="group relative overflow-hidden bg-card border-border hover:border-primary/50 transition-all">
                  <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-10" aria-label={project.title}></Link>
                   <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={project.coverImage.url}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
                     <div className="flex flex-wrap gap-2 my-2">
                        {project.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                      </div>
                    <p className="text-muted-foreground text-sm line-clamp-2">{project.description}</p>
                    {project.liveUrl && (
                      <div className="absolute top-2 right-2 z-20">
                          <Button asChild variant="secondary" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"><ExternalLink className="h-4 w-4" /></a>
                          </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
        </section>
      )}

       {/* Latest Articles (Blog) */}
       {blogs.length > 0 && (
          <section>
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-2xl font-bold text-primary">
                    <Newspaper className="h-6 w-6"/> Latest Article.
                </h2>
                <Link href="/blog" className="flex items-center gap-1 text-sm text-primary hover:underline">
                    View all articles <ArrowRight className="h-4 w-4"/>
                </Link>
              </div>
              <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
                {blogs.map((blog) => (
                   <Link key={blog._id as string} href={`/blog/${blog.slug}`} className="group block p-4 -mx-4 rounded-lg hover:bg-card">
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{blog.title}</h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        {format(new Date(blog.createdAt), 'MMMM d, yyyy')}
                      </p>
                  </Link>
                ))}
              </div>
          </section>
        )}

      {/* Keep In Touch */}
      <section className="text-center">
            <h2 className="text-4xl font-bold text-foreground">Keep In Touch.</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              I'm currently open for new opportunities. Feel free to get in touch and talk more about your projects.
            </p>
             <div className="mt-8 flex justify-center gap-4">
                 <Button asChild variant="outline">
                    <Link href="#" target="_blank">
                        <Linkedin /> LinkedIn
                    </Link>
                </Button>
                <Button asChild>
                    <a href="mailto:ganeshtidke1@example.com">
                        <Mail /> Email
                    </a>
                </Button>
            </div>
      </section>
    </div>
  );
}
