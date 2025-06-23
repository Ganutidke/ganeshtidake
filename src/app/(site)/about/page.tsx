
import Image from 'next/image';
import { getAbout } from '@/lib/actions/about.actions';
import PagePlaceholder from '@/components/site/page-placeholder';
import { Badge } from '@/components/ui/badge';

export default async function AboutPage() {
  const about = await getAbout();

  if (!about) {
    return (
      <PagePlaceholder
        title="About Me"
        description="This page is not configured yet. Please add content in the admin panel."
      />
    );
  }

  return (
    <div className="container py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        <div className="md:col-span-1 flex flex-col items-center text-center">
          <div className="relative h-64 w-64 rounded-full shadow-lg overflow-hidden border-4 border-primary/50">
            <Image
              src={about.profilePicture.url}
              alt="Ganesh Tidke"
              fill
              className="object-cover"
            />
          </div>
          <h1 className="font-headline text-4xl font-bold text-primary mt-6">Ganesh Tidke</h1>
          <div className="mt-6">
            <h2 className="text-2xl font-bold font-headline text-secondary">Skills</h2>
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {about.skills.map((skill) => (
                <Badge key={skill} variant="secondary">{skill}</Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="md:col-span-2">
           <h2 className="text-3xl font-bold font-headline text-primary mb-4">About Me</h2>
           <div className="prose prose-invert prose-lg max-w-none text-muted-foreground">
             <p>{about.bio}</p>
           </div>
        </div>
      </div>
    </div>
  );
}
