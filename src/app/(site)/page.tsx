import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-6xl lg:text-7xl">
            Showcase Your Vision
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
            Welcome to VisionFolio, the ultimate platform to build a stunning, modern portfolio that brings your creative work to life.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/projects">
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="relative h-96 rounded-lg shadow-lg">
              <Image
                src="https://placehold.co/600x400.png"
                alt="VisionFolio dashboard"
                fill
                className="rounded-lg object-cover"
                data-ai-hint="abstract geometric"
              />
            </div>
            <div>
              <h2 className="font-headline text-3xl font-bold text-primary">Effortless Content Management</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                With our intuitive admin panel, you can easily add, edit, and delete projects, blog posts, and certificates. Keep your portfolio fresh without touching a single line of code.
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start">
                  <Star className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-accent" />
                  <span>
                    <strong className="font-semibold">Dynamic Projects:</strong> Showcase your work with rich descriptions and images.
                  </span>
                </li>
                <li className="flex items-start">
                  <Star className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-accent" />
                  <span>
                    <strong className="font-semibold">Insightful Blogs:</strong> Share your knowledge and build your personal brand.
                  </span>
                </li>
                <li className="flex items-start">
                  <Star className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-accent" />
                  <span>
                    <strong className="font-semibold">Verified Certificates:</strong> Add credibility with a dedicated space for your certifications.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-headline text-3xl font-bold text-primary">Featured Projects</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            A glimpse into the innovative solutions and creative endeavors I've brought to life.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="transform overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-primary/20 hover:shadow-lg">
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full">
                    <Image
                      src={`https://placehold.co/400x30${i - 1}.png`}
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
                    <Link href="#">
                      View Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card py-16">
        <div className="container mx-auto px-4 text-center">
            <h2 className="font-headline text-3xl font-bold text-primary">Ready to Build Your Vision?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Let's connect and discuss how we can create something amazing together. Reach out and let's start the conversation.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/contact">
                Contact Me
              </Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
