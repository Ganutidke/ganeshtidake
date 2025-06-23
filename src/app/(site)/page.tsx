import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-6xl lg:text-7xl">
            Hi, I’m Ganesh Tidke
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
            A passionate Full-Stack Developer creating modern and responsive web applications.
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
      <section className="bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="relative mx-auto h-80 w-80 rounded-full shadow-lg overflow-hidden">
              <Image
                src="https://placehold.co/400x400.png"
                alt="Ganesh Tidke"
                fill
                className="object-cover"
                data-ai-hint="profile picture"
              />
            </div>
            <div className="text-center md:text-left">
              <h2 className="font-headline text-3xl font-bold text-primary">About Me</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                I am a dedicated and results-driven developer with a passion for building beautiful and functional websites. With a strong foundation in both front-end and back-end technologies, I specialize in bringing ideas to life, from concept to deployment.
              </p>
               <p className="mt-4 text-lg text-muted-foreground">
                My goal is to leverage my skills to create seamless user experiences and robust applications.
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

      {/* Highlighted Projects */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-headline text-3xl font-bold text-primary">Highlighted Projects</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            A glimpse into the innovative solutions and creative endeavors I've brought to life.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="transform overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-primary/20 hover:shadow-lg">
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full">
                    <Image
                      src={`https://placehold.co/400x${300 + i}.png`}
                      alt={`Project ${i}`}
                      fill
                      className="object-cover"
                      data-ai-hint="technology code"
                    />
                  </div>
                   <CardTitle className="p-6 pb-2 font-headline">Project Title {i}</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <p className="text-muted-foreground">A brief description of this amazing project goes here, highlighting key technologies and outcomes.</p>
                  <Button asChild variant="link" className="mt-4 p-0">
                    <Link href="/projects">
                      View Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
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

       {/* Blog Teasers */}
      <section className="bg-card py-20 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-headline text-3xl font-bold text-primary">From the Blog</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            Sharing my thoughts on web development, AI, and more.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="transform overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-primary/20 hover:shadow-lg">
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full">
                    <Image
                      src={`https://placehold.co/400x${303 + i}.png`}
                      alt={`Blog Post ${i}`}
                      fill
                      className="object-cover"
                      data-ai-hint="writing desk"
                    />
                  </div>
                  <CardTitle className="p-6 pb-2 font-headline">Blog Post Title {i}</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <p className="text-muted-foreground">An excerpt from the blog post, teasing the content within to encourage readers to click through...</p>
                   <Button asChild variant="link" className="mt-4 p-0">
                    <Link href="/blog">
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

      {/* Certificates / Achievements */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-headline text-3xl font-bold text-primary">Certificates & Achievements</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            Proudly showcasing my certified skills and accomplishments.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="flex flex-col items-center justify-center p-6 text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-primary/20 hover:shadow-lg">
                 <div className="relative h-32 w-32 mb-4">
                    <Image
                      src={`https://placehold.co/128x128.png`}
                      alt={`Certificate ${i}`}
                      fill
                      className="object-contain"
                      data-ai-hint="certificate badge"
                    />
                  </div>
                  <CardTitle className="font-headline text-xl">Certificate Name {i}</CardTitle>
                  <p className="text-muted-foreground mt-2">Issued by: Authority {i}</p>
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

      {/* Call to Action */}
      <section className="bg-card py-16">
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
