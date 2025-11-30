import Link from 'next/link';
import { getIntro } from '@/lib/actions/intro.actions';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default async function Footer() {
  const intro = await getIntro();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Work' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <footer className="bg-card border-t border-border/40 mt-24">
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-sm">

          <div className="md:col-span-5 lg:col-span-6">
            <Link href="/" className="text-2xl font-bold font-headline text-foreground hover:text-primary transition-colors">
              {intro?.headline || 'Ganesh Tidke'}
            </Link>
            <p className="mt-2 text-muted-foreground max-w-sm">
              {intro?.subheadline || 'A self-taught developer transforming ideas into digital realities.'}
            </p>
          </div>

          <div className="md:col-span-3 lg:col-span-2">
            <h3 className="font-semibold text-foreground tracking-wider uppercase">Menu</h3>
            <ul className="mt-4 space-y-3">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 lg:col-span-4">
            <h3 className="font-semibold text-foreground tracking-wider uppercase">Connect</h3>
            <div className="mt-4 flex gap-2">
              {intro?.githubUrl && (
                <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hover:bg-primary/10">
                  <Link href={intro.githubUrl} target="_blank" aria-label="GitHub">
                    <Github />
                  </Link>
                </Button>
              )}
              {intro?.linkedinUrl && (
                <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hover:bg-primary/10">
                  <Link href={intro.linkedinUrl} target="_blank" aria-label="LinkedIn">
                    <Linkedin />
                  </Link>
                </Button>
              )}
              {intro?.email && (
                <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hover:bg-primary/10">
                  <a href={`mailto:${intro.email}`} aria-label="Email">
                    <Mail />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-border/40" />

        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>
            Developed by Ganesh Tidake © {new Date().getFullYear()} All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
