import Link from 'next/link';
import { getIntro } from '@/lib/actions/intro.actions';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function Footer() {
  const intro = await getIntro();
  
  return (
    <footer className="py-8 mt-16 border-t border-border/40 bg-card/50">
      <div className="container max-w-7xl mx-auto flex flex-col items-center gap-6 px-4">
        {intro && (
          <div className="flex gap-4">
            {intro.githubUrl && (
              <Button asChild variant="ghost" size="icon">
                <Link href={intro.githubUrl} target="_blank" aria-label="GitHub">
                  <Github />
                </Link>
              </Button>
            )}
            {intro.linkedinUrl && (
              <Button asChild variant="ghost" size="icon">
                <Link href={intro.linkedinUrl} target="_blank" aria-label="LinkedIn">
                  <Linkedin />
                </Link>
              </Button>
            )}
            {intro.email && (
              <Button asChild variant="ghost" size="icon">
                <a href={`mailto:${intro.email}`} aria-label="Email">
                  <Mail />
                </a>
              </Button>
            )}
          </div>
        )}
        <div className="text-center text-muted-foreground text-sm">
            <p>Developed by Ganesh Tidake</p>
            <p className="mt-1">© {new Date().getFullYear()} All Rights Reserved. | <Link href="/admin" className="hover:text-primary transition-colors">Admin Login</Link></p>
        </div>
      </div>
    </footer>
  );
}
