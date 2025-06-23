
import Image from 'next/image';
import { getAbout } from '@/lib/actions/about.actions';
import PagePlaceholder from '@/components/site/page-placeholder';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

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

  const skillCategories = getSkillCategories(about.skills);

  return (
    <div className="container max-w-7xl mx-auto px-4 py-16">
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
        </div>
        <div className="md:col-span-2">
           <h2 className="text-3xl font-bold font-headline text-primary mb-4">About Me</h2>
           <div className="prose prose-invert prose-lg max-w-none text-muted-foreground">
             <p>{about.bio}</p>
           </div>
        </div>
      </div>
      
      {skillCategories && skillCategories.length > 0 && (
        <div className="mt-16">
          <h2 className="text-3xl font-bold font-headline text-primary text-center mb-8">My Skills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category) => (
              <Card key={category.category}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">{category.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
